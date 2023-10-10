use serde::{Deserialize, Serialize};

use super::{field::Field, output::Output};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Endpoint {
    docs: Option<Vec<String>>,
    name: String,
    #[serde(rename = "onlyOwner")]
    only_owner: Option<bool>,
    mutability: Mutability,
    #[serde(rename = "payableInTokens")]
    payable_in_tokens: Option<Vec<String>>,
    inputs: Vec<Field>,
    outputs: Vec<Output>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(rename_all = "lowercase")]
pub enum Mutability {
    Mutable,
    Readonly,
}
