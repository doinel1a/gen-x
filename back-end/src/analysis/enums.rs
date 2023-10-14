use std::collections::HashMap;

use crate::models::sc_abi::{
    custom_type::{CustomType, CustomTypeType},
    variant::Variant,
};

pub fn get_custom_enums(types: &HashMap<String, CustomType>) -> HashMap<String, Vec<Variant>> {
    let mut custom_enums: HashMap<String, Vec<Variant>> = HashMap::new();

    for (name, custom_type) in types {
        match custom_type.type_() {
            CustomTypeType::Enum => {
                for variants in custom_type.variants() {
                    custom_enums.insert(name.to_string(), variants.to_vec());
                }
            }
            CustomTypeType::Struct => {}
        }
    }

    custom_enums
}
