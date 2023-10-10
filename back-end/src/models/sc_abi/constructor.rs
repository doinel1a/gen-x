use serde::{Deserialize, Serialize};

use super::{field::Field, output::Output};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Constructor {
    docs: Option<Vec<String>>,
    inputs: Vec<Field>,
    outputs: Vec<Output>,
}
