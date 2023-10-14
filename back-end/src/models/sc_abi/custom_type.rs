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

impl CustomType {
    pub fn type_(&self) -> &CustomTypeType {
        &self.type_
    }

    pub fn fields(&self) -> &Option<Vec<Field>> {
        &self.fields
    }

    pub fn variants(&self) -> &Option<Vec<Variant>> {
        &self.variants
    }
}
