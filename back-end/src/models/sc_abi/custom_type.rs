use serde::{Deserialize, Serialize};

use super::{field::Field, variant::Variant};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct CustomType {
    #[serde(rename = "type")]
    type_: CustomTypeType,
    fields: Option<Vec<Field>>,
    variants: Option<Vec<Variant>>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(rename_all = "lowercase")]
pub enum CustomTypeType {
    Enum,
    Struct,
}
