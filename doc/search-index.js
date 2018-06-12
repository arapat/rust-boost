var searchIndex = {};
searchIndex["rust_boost_bin"] = {"doc":"","items":[],"paths":[]};
searchIndex["rustboost"] = {"doc":"rustboost is an implementation of TMSN for boosting.","items":[[0,"bins","rustboost","The values of percentiles on each feature dimension.",null,null],[3,"Bins","rustboost::bins","TODO: support NaN feature values",null,null],[5,"create_bins","","Create ",null,{"inputs":[{"name":"usize"},{"name":"usize"},{"name":"range"},{"name":"bufferloader"}],"output":{"generics":["bins"],"name":"vec"}}],[11,"len","","",0,{"inputs":[{"name":"self"}],"output":{"name":"usize"}}],[11,"get_vals","","",0,{"inputs":[{"name":"self"}],"output":{"name":"vec"}}],[0,"boosting","rustboost","High level implementation of the AdaBoost algorithm with early stopping rule.",null,null],[3,"Boosting","rustboost::boosting","",null,null],[11,"new","","",1,{"inputs":[{"name":"bufferloader"},{"generics":["usize"],"name":"range"},{"name":"usize"},{"name":"usize"},{"name":"f32"},{"name":"f32"},{"name":"f32"},{"generics":["lossfunc"],"name":"vec"}],"output":{"name":"boosting"}}],[11,"enable_network","","",1,{"inputs":[{"name":"self"},{"name":"string"},{"name":"vec"},{"name":"u16"}],"output":null}],[11,"training","","",1,{"inputs":[{"name":"self"},{"name":"usize"},{"name":"u32"},{"name":"u32"}],"output":null}],[0,"commons","rustboost","Common functions and classes.",null,null],[5,"get_weight","rustboost::commons","",null,{"inputs":[{"name":"example"},{"name":"f32"}],"output":{"name":"f32"}}],[5,"get_weights","","",null,null],[5,"get_absolute_weights","","",null,null],[5,"get_relative_weights","","",null,null],[5,"get_bound","","",null,{"inputs":[{"name":"f32"},{"name":"f32"}],"output":{"generics":["f32"],"name":"option"}}],[5,"get_symmetric_label","","",null,{"inputs":[{"name":"example"}],"output":{"name":"f32"}}],[5,"max","","",null,{"inputs":[{"name":"t"},{"name":"t"}],"output":{"name":"t"}}],[5,"min","","",null,{"inputs":[{"name":"t"},{"name":"t"}],"output":{"name":"t"}}],[5,"is_zero","","",null,{"inputs":[{"name":"f32"}],"output":{"name":"bool"}}],[5,"get_sign","","",null,{"inputs":[{"name":"f64"}],"output":{"name":"i8"}}],[5,"is_positive","","",null,{"inputs":[{"name":"f32"}],"output":{"name":"bool"}}],[0,"performance_monitor","","",null,null],[3,"PerformanceMonitor","rustboost::commons::performance_monitor","",null,null],[11,"fmt","","",2,{"inputs":[{"name":"self"},{"name":"formatter"}],"output":{"name":"result"}}],[11,"new","","",2,{"inputs":[],"output":{"name":"performancemonitor"}}],[11,"reset","","",2,{"inputs":[{"name":"self"}],"output":null}],[11,"start","","",2,{"inputs":[{"name":"self"}],"output":null}],[11,"resume","","",2,{"inputs":[{"name":"self"}],"output":null}],[11,"update","","",2,{"inputs":[{"name":"self"},{"name":"usize"}],"output":null}],[11,"pause","","",2,{"inputs":[{"name":"self"}],"output":null}],[11,"get_performance","","",2,null],[11,"reset_last_check","","",2,{"inputs":[{"name":"self"}],"output":null}],[11,"get_duration","","",2,{"inputs":[{"name":"self"}],"output":{"name":"f32"}}],[0,"io","rustboost::commons","",null,null],[5,"create_bufreader","rustboost::commons::io","",null,{"inputs":[{"name":"string"}],"output":{"generics":["file"],"name":"bufreader"}}],[5,"create_bufwriter","","",null,{"inputs":[{"name":"string"}],"output":{"generics":["file"],"name":"bufwriter"}}],[5,"read_k_lines","","",null,{"inputs":[{"name":"bufreader"},{"name":"usize"}],"output":{"generics":["string"],"name":"vec"}}],[5,"read_k_labeled_data","","",null,{"inputs":[{"name":"bufreader"},{"name":"usize"},{"name":"tfeature"},{"name":"usize"}],"output":{"generics":["labeleddata"],"name":"vec"}}],[5,"read_k_labeled_data_from_binary_file","","",null,{"inputs":[{"name":"bufreader"},{"name":"usize"},{"name":"usize"}],"output":{"generics":["example"],"name":"vec"}}],[5,"write_to_binary_file","","",null,{"inputs":[{"name":"bufwriter"},{"name":"example"}],"output":{"name":"usize"}}],[5,"write_to_text_file","","",null,{"inputs":[{"name":"bufwriter"},{"name":"string"}],"output":null}],[5,"parse_libsvm_one_line","","",null,{"inputs":[{"name":"string"},{"name":"tfeature"},{"name":"usize"}],"output":{"name":"labeleddata"}}],[5,"parse_libsvm","","",null,{"inputs":[{"name":"vec"},{"name":"tfeature"},{"name":"usize"}],"output":{"generics":["labeleddata"],"name":"vec"}}],[6,"TFeature","rustboost::commons","",null,null],[6,"TLabel","","",null,null],[6,"Example","","",null,null],[6,"ExampleInSampleSet","","",null,null],[6,"ExampleWithScore","","",null,null],[6,"Model","","",null,null],[6,"ModelScore","","",null,null],[6,"LossFunc","","",null,null],[0,"config","rustboost","Configurations that can be stored in a separate JSON file.",null,null],[3,"Config","rustboost::config","",null,null],[11,"get_network","","",3,{"inputs":[{"name":"self"}],"output":{"name":"vec"}}],[11,"get_data_dir","","",3,{"inputs":[{"name":"self"}],"output":{"name":"string"}}],[0,"buffer_loader","rustboost","A data loader with two independent caches. Alternatively, we use one of the caches to feed data to the boosting algorithm, and the other to load next sample set.",null,null],[3,"BufferLoader","rustboost::buffer_loader","",null,null],[11,"fmt","","",4,{"inputs":[{"name":"self"},{"name":"formatter"}],"output":{"name":"result"}}],[11,"new","","",4,{"inputs":[{"name":"usize"},{"name":"usize"},{"generics":["examplewithscore"],"name":"receiver"},{"name":"bool"}],"output":{"name":"bufferloader"}}],[11,"load","","",4,{"inputs":[{"name":"self"}],"output":null}],[11,"get_num_batches","","",4,{"inputs":[{"name":"self"}],"output":{"name":"usize"}}],[11,"get_curr_batch","","",4,null],[11,"fetch_next_batch","","",4,{"inputs":[{"name":"self"},{"name":"bool"}],"output":null}],[11,"update_scores","","",4,{"inputs":[{"name":"self"},{"name":"model"}],"output":null}],[11,"get_ess","","",4,{"inputs":[{"name":"self"}],"output":{"generics":["f32"],"name":"option"}}],[0,"labeled_data","rustboost","The class of the training examples.",null,null],[3,"LabeledData","rustboost::labeled_data","",null,null],[11,"clone","","",5,{"inputs":[{"name":"self"}],"output":{"name":"labeleddata"}}],[11,"fmt","","",5,{"inputs":[{"name":"self"},{"name":"formatter"}],"output":{"name":"result"}}],[11,"new","","",5,{"inputs":[{"name":"vec"},{"name":"tlabel"}],"output":{"name":"labeleddata"}}],[11,"get_features","","",5,{"inputs":[{"name":"self"}],"output":{"name":"vec"}}],[11,"get_label","","",5,{"inputs":[{"name":"self"}],"output":{"name":"tlabel"}}],[11,"eq","","",5,{"inputs":[{"name":"self"},{"name":"labeleddata"}],"output":{"name":"bool"}}],[0,"learner","rustboost","The class that evaluates the early stopping rule on the candidate weak rules.",null,null],[3,"WeakRule","rustboost::learner","",null,null],[3,"Learner","","",null,null],[11,"create_tree","","",6,{"inputs":[{"name":"self"}],"output":{"name":"tree"}}],[11,"new","","",7,{"inputs":[{"name":"f32"},{"generics":["bins"],"name":"vec"},{"name":"range"}],"output":{"name":"learner"}}],[11,"reset","","",7,{"inputs":[{"name":"self"}],"output":null}],[11,"get_count","","",7,{"inputs":[{"name":"self"}],"output":{"name":"usize"}}],[11,"get_rho_gamma","","",7,{"inputs":[{"name":"self"}],"output":{"name":"f32"}}],[11,"reset_all","","",7,{"inputs":[{"name":"self"}],"output":null}],[11,"shrink_target","","",7,{"inputs":[{"name":"self"}],"output":null}],[11,"update","","",7,null],[11,"get_new_weak_rule","","",7,{"inputs":[{"name":"self"}],"output":{"name":"option"}}],[0,"network","rustboost","Manage network I/O",null,null],[5,"start_network","rustboost::network","Start the network module on the current computer.",null,{"inputs":[{"name":"string"},{"name":"vec"},{"name":"u16"},{"generics":["modelscore"],"name":"sender"},{"generics":["modelscore"],"name":"receiver"}],"output":null}],[0,"sampler","rustboost","Sampling data from the stratified storage.",null,null],[5,"run_sampler","rustboost::sampler","",null,{"inputs":[{"name":"usize"},{"name":"f32"},{"name":"usize"},{"generics":["examplewithscore"],"name":"receiver"},{"generics":["examplewithscore"],"name":"sender"},{"generics":["examplewithscore"],"name":"syncsender"},{"generics":["model"],"name":"receiver"}],"output":null}],[0,"stratified_storage","rustboost","A stratified storage structor that organize examples on disk according to their weights.",null,null],[5,"run_stratified","rustboost::stratified_storage","",null,null],[0,"tree","rustboost","The class of the weak learner, namely a decision stump.",null,null],[3,"Tree","rustboost::tree","",null,null],[11,"fmt","","",8,{"inputs":[{"name":"self"},{"name":"formatter"}],"output":{"name":"result"}}],[11,"clone","","",8,{"inputs":[{"name":"self"}],"output":{"name":"tree"}}],[11,"new","","",8,{"inputs":[{"name":"u16"}],"output":{"name":"tree"}}],[11,"release","","",8,{"inputs":[{"name":"self"}],"output":null}],[11,"split","","",8,{"inputs":[{"name":"self"},{"name":"usize"},{"name":"usize"},{"name":"f32"},{"name":"f32"},{"name":"f32"}],"output":null}],[11,"add_prediction_to_score","","",8,{"inputs":[{"name":"self"},{"name":"vec"},{"name":"vec"}],"output":null}],[11,"get_leaf_prediction","","",8,{"inputs":[{"name":"self"},{"name":"example"}],"output":{"name":"f32"}}],[11,"eq","","",8,{"inputs":[{"name":"self"},{"name":"tree"}],"output":{"name":"bool"}}]],"paths":[[3,"Bins"],[3,"Boosting"],[3,"PerformanceMonitor"],[3,"Config"],[3,"BufferLoader"],[3,"LabeledData"],[3,"WeakRule"],[3,"Learner"],[3,"Tree"]]};
initSearch(searchIndex);
