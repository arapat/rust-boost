use commons::tree::UpdateList;


#[derive(Debug)]
pub enum PacketType {
    Accept,
    Fallback,
    SmallEffSize,
    AssignMismatch,
}


#[derive(Serialize, Deserialize, Debug)]
pub struct Packet {
    pub packet_signature: String,
    pub source_machine: String,
    pub source_machine_id: usize,
    pub node_id: usize,
    pub updates: UpdateList,
    pub gamma: f32,
    pub sample_version: usize,
    pub ess: f32,
    pub base_model_signature: String,
    pub this_model_signature: String,
    pub fallback: bool,
}


impl Packet {
    pub fn new(
        machine_name: &String,
        machine_id: usize,
        node_id: usize,
        packet_counter: usize,
        final_model_size: usize,
        updates: UpdateList,
        gamma: f32,
        ess: f32,
        sample_version: usize,
        base_model_sig: String,
        fallback: bool,
    ) -> Packet {
        let this_model_sig = machine_name.clone() + "_" + &final_model_size.to_string();
        let packet_sig = format!("pac_{}_{}", this_model_sig, packet_counter);
        Packet {
            packet_signature: packet_sig,
            source_machine: machine_name.clone(),
            source_machine_id: machine_id,
            node_id: node_id,
            updates: updates,
            gamma: gamma,
            sample_version: sample_version,
            ess: ess,
            base_model_signature: base_model_sig,
            this_model_signature: this_model_sig,
            fallback: fallback,
        }
    }

    pub fn get_packet_type(&self, assignment: Option<usize>, min_ess: f32) -> PacketType {
        // Ignore any claims made on a very small effective sample
        let assignment: i32 = {
            if assignment.is_none() {
                -1
            } else {
                assignment.unwrap() as i32
            }
        };
        if assignment != (self.node_id as i32) {
            debug!("model_manager, packet, worker assignment mismatch, {}, {}, {}, {}",
                    self.source_machine_id, assignment, self.node_id, self.ess);
            PacketType::AssignMismatch
        } else if self.ess < min_ess {
            debug!("model_manager, packet, small ess, {}, {}, {}",
                    self.source_machine_id, self.node_id, self.ess);
            PacketType::SmallEffSize
        } else if self.fallback {
            // Empty packets
            debug!("model_manager, packet, fallback, {}, {}, {}",
                    self.source_machine_id, self.node_id, self.ess);
            PacketType::Fallback
        } else {
            debug!("model_manager, packet, accept, {}, {}, {}",
                    self.source_machine_id, self.node_id, self.ess);
            PacketType::Accept
        }
    }
}
