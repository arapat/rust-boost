use rayon::prelude::*;
use serde_json;
use metricslib::validate as mvalidate;
use metricslib::EvalFunc;

use std::io::BufRead;
use std::io::Write;
use commons::bins::load_bins;
use commons::io::create_bufreader;
use commons::io::create_bufwriter;
use commons::io::raw_read_all;
use commons::io::write_all;
use commons::model::Model;
use head::sampler::stratified_storage::serial_storage::SerialStorage;
use TLabel;


/// Validating a list of models
///
/// The file `models_table` should have one line for each model to be validated.
/// Each line contains two strings separated by a comma, where the first string
/// is the path to the persisted model, and the second string is the path to print
/// the scores.
pub fn validate(
    models_table: String,
    testing_filename: String,
    num_examples: usize,
    num_features: usize,
    batch_size: usize,
    positive: String,
    incremental_testing: bool,
    scores_only: bool,
) {
    // TODO: make eval_funcs a parameter
    let eval_funcs = vec![EvalFunc::AdaBoostLoss, EvalFunc::AUPRC, EvalFunc::AUROC, EvalFunc::ErrorRate];
    let mut performance_out = {
        if scores_only {
            None
        } else {
            Some(create_bufwriter(&"models/performance.csv".to_string()))
        }
    };
    let bins = load_bins("testing", None);
    let mut models_list = create_bufreader(&models_table);
    let mut data = SerialStorage::new(
        testing_filename,
        num_examples,
        num_features,
        false,
        positive,
        Some(bins),
    );
    let mut scores = vec![0.0; num_examples];
    let mut labels: Vec<TLabel> = vec![0.0 as TLabel; num_examples];
    let mut last_model_length = 0;
    loop {
        let mut line = String::new();
        if models_list.read_line(&mut line).is_err() || line.trim() == "" {
            break;
        }
        let filepath = line.to_string().trim().to_string();
        line.clear();
        // validate model
        let (ts, _, model): (f32, usize, Model) =
            serde_json::from_str(
                &raw_read_all(&filepath).expect(&format!("Cannot read `{}`", filepath))
            ).expect(&format!("Cannot parse the model in `{}`", filepath));
        let mut index = 0;
        while index < num_examples {
            let batch = data.read(batch_size);
            let end = std::cmp::min(index + batch.len(), num_examples);
            batch.par_iter()
                 .zip(scores[index..end].par_iter_mut())
                 .for_each(|(example, score)| {
                     *score += model.get_prediction(example, last_model_length).0;
                 });
            batch.par_iter()
                    .zip(labels[index..end].par_iter_mut())
                    .for_each(|(example, label)| {
                        *label = example.label;
                    });
            index += batch.len();
        }

        // output
        match performance_out.as_mut() {
            Some(out) => {
                let sorted_scores_labels = {
                    let mut scores_labels: Vec<(f32, f32)> =
                        scores.iter().zip(labels.iter())
                              .map(|(a, b)| (*a as f32, *b as f32)).collect();
                    scores_labels.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap().reverse());
                    scores_labels
                };
                let performance_scores: Vec<String> =
                    mvalidate(&sorted_scores_labels, &eval_funcs).iter()
                                                                 .map(|t| t.to_string())
                                                                 .collect();
                let meta_info = vec![
                    filepath.clone(), ts.to_string(), model.size().to_string(),
                    model.size().to_string()];
                let output = format!("{},{}\n", meta_info.join(","), performance_scores.join(","));
                out.write(output.as_bytes())
                   .expect("Failed to write the performance scores to file.");
                info!("{}", output.trim());
            },
            None => {
                let outputpath = filepath.clone() + "_scores";
                let preds: Vec<String> = scores.iter().map(|t| t.to_string()).collect();
                write_all(&outputpath, &preds.join("\n").as_bytes()).expect(
                    &format!("Cannot write the predictions of the model `{}`", filepath));
                info!("Processed {}", filepath);
            },
        }

        // Reset scores if necessary
        if incremental_testing {
            last_model_length = model.size();
        } else {
            for i in 0..scores.len() {
                scores[i] = 0.0;
            }
        }
    }
}
