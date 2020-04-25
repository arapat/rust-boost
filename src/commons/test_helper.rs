use std::sync::mpsc;
use rand;
use rand::Rng;

use TFeature;
use commons::ExampleWithScore;
use commons::labeled_data::LabeledData;
use commons::packet::Packet;
use commons::tree::UpdateList;


pub fn get_synthetic_example(features: Vec<TFeature>, label: i8, score: f32) -> ExampleWithScore {
    let example = LabeledData::new(features, label);
    (example, (score, 0))
}


pub fn get_n_random_examples(n: usize, num_features: usize) -> Vec<ExampleWithScore> {
    let mut rng = rand::thread_rng();
    (0..n).map(|_| {
        let features: Vec<TFeature> = (0..num_features).map(|_| { rng.gen::<TFeature>() })
                                                       .collect();
        let label: i8 = rng.gen_range(0, 1);
        get_synthetic_example(features, label, 0.0)
    }).collect()
}


pub fn get_mock_packet(
    machine_id: usize, node_id: usize, gamma: f32, packet_size: usize,
) -> Packet {
    let ess = 0.5;
    let mut update_list = UpdateList::new();
    for _ in 0..packet_size {
        update_list.add(0, 0, 0 as TFeature, false, 0.0, vec![], true);
    }
    Packet::new(
        &"local_machine".to_string(),
        machine_id,
        0,
        node_id,
        3,
        update_list,
        gamma,
        ess,
        0,
        "base_model_sig".to_string(),
    )
}


pub fn start_network_only_recv<T: 'static + Send>(
    _name: &str, _remote_ips: &Vec<String>, _port: u16, _data_remote: mpsc::Sender<T>,
) -> Result<(), &'static str> {
    Ok(())
}