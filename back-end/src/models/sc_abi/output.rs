use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Output {
    #[serde(rename = "type")]
    pub type_: String,
    pub multi_result: Option<bool>,
}
