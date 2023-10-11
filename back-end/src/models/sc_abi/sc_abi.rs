use serde::{Deserialize, Serialize};
use std::collections::HashMap;

use super::{constructor::Constructor, custom_type::CustomType, endpoint::Endpoint, event::Event};

#[derive(Serialize, Deserialize, Debug)]
pub struct SCAbi {
    docs: Option<Vec<String>>,
    name: String,
    constructor: Constructor,
    endpoints: Vec<Endpoint>,
    events: Vec<Event>,
    #[serde(rename = "hasCallback")]
    has_callback: bool,
    types: HashMap<String, CustomType>,
}

impl SCAbi {
    pub fn name(&self) -> &String {
        &self.name
    }

    pub fn endpoints(&self) -> &Vec<Endpoint> {
        &self.endpoints
    }
}
