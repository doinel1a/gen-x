use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Field {
    pub name: String,
    #[serde(rename = "type")]
    pub type_: String,
    pub indexed: Option<bool>,
}
