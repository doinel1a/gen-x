use serde::{Deserialize, Serialize};

use super::field::Field;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Event {
    identifier: String,
    inputs: Vec<Field>,
}
