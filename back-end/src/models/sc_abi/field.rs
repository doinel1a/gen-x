use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Field {
    pub name: String,
    #[serde(rename = "type")]
    pub type_: String,
    pub indexed: Option<bool>,
}

impl Field {
    pub fn name(&self) -> &String {
        &self.name
    }

    pub fn type_(&self) -> &String {
        &self.type_
    }
}
