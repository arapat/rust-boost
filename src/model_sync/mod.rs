use std::sync::mpsc;
use std::thread::spawn;
use bincode::serialize;
use bincode::deserialize;
use commons::Model;
use commons::ModelSig;
use commons::channel::Sender;
use commons::io::load_s3 as io_load_s3;
use commons::io::write_s3 as io_write_s3;
use commons::io::delete_s3;
use tree::Tree;
use tmsn::network::start_network_only_recv;


pub const FILENAME: &str = "model.bin";
pub const REGION:   &str = "us-east-1";
pub const BUCKET:   &str = "tmsn-cache2";
pub const S3_PATH:  &str = "sparrow-models/";



pub fn start_model_sync(
    tree_size: usize,
    name: String,
    remote_ips: &Vec<String>,
    port: u16,
    next_model: Sender<Model>,
) {
    let (local_s, local_r): (mpsc::Sender<ModelSig>, mpsc::Receiver<ModelSig>) =
        mpsc::channel();
    start_network_only_recv(name.as_ref(), remote_ips, port, local_s);
    upload_model(&Tree::new(tree_size, 0.0), &"".to_string());
    debug!("Starting the receive models module");
    spawn(move || { receive_models(local_r, next_model); });
}


// Worker download models
pub fn download_model() -> Option<(Model, String)> {
    debug!("sampler, start, download model");
    let ret = io_load_s3(REGION, BUCKET, S3_PATH, FILENAME);
    debug!("sampler, finished, download model");
    if ret.is_none() {
        debug!("sample, download model, failed");
        return None;
    }
    let (data, code) = ret.unwrap();
    if code == 200 {
        debug!("sample, download model, succeed");
        Some(deserialize(&data).unwrap())
    } else {
        debug!("sample, download model, failed with return code {}", code);
        None
    }
}


// Server upload models
fn upload_model(model: &Model, sig: &String) -> bool {
    let data = (model.clone(), sig.clone());
    io_write_s3(REGION, BUCKET, S3_PATH, FILENAME, &serialize(&data).unwrap())
}


fn receive_models(receiver: mpsc::Receiver<ModelSig>, next_model_sender: Sender<Model>) {
    let mut model_sig = "".to_string();
    let mut model = Tree::new(1, 0.0);
    loop {
        let (patch, old_sig, new_sig) = receiver.recv().unwrap();
        if old_sig != model_sig {
            debug!("model_manager, reject, {}, {}", old_sig, new_sig);
            continue;
        }
        model.append_patch(&patch, old_sig == "");
        model_sig = new_sig;
        next_model_sender.send(model.clone());
        if upload_model(&model, &model_sig) {
            debug!("model_manager, accept, {}, {}", old_sig, model_sig);
        } else {
            debug!("model_manager, upload failed, {}, {}", old_sig, model_sig);
        }
    }
}


pub fn clear_s3() {
    delete_s3(REGION, BUCKET, S3_PATH, FILENAME);
}
