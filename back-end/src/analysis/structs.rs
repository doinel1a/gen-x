use std::collections::HashMap;

use crate::models::sc_abi::{
    custom_type::{CustomType, CustomTypeType},
    field::Field,
};
use crate::utils::string_mutation::StringMutation;

pub fn get_custom_structs(types: &HashMap<String, CustomType>) -> HashMap<String, Vec<Field>> {
    let mut custom_structs: HashMap<String, Vec<Field>> = HashMap::new();

    for (name, custom_type) in types {
        match custom_type.type_() {
            CustomTypeType::Enum => {}
            CustomTypeType::Struct => {
                let mut struct_fields = Vec::<Field>::new();

                for fields in custom_type.fields() {
                    for field in fields {
                        let field_name = field.name().to_string().snake_to_camel_case();
                        let field_type = match field.type_().as_str() {
                            "Address" | "TokenIdentifier" => "string".to_string(),
                            "usize" | "u8" | "u16" | "u32" | "u64" | "BigUint" => {
                                "number".to_string()
                            }
                            "isize" | "i8" | "i16" | "i32" | "i64" | "BigInt" => {
                                "number".to_string()
                            }
                            "bytes" | "utf-8 string" => "string".to_string(),
                            "bool" => "boolean".to_string(),
                            "List<Address>" | "variadic<Address>" => "string[]".to_string(),
                            "List<usize>" | "List<u8>" | "List<u16>" | "List<u32>"
                            | "List<u64>" | "List<BigUint>" => "number[]".to_string(),
                            "variadic<usize>" | "variadic<u8>" | "variadic<u16>"
                            | "variadic<u32>" | "variadic<u64>" | "variadic<BigUint>" => {
                                "number[]".to_string()
                            }
                            "List<isize>" | "List<i8>" | "List<i16>" | "List<i32>"
                            | "List<i64>" | "List<BigInt>" => "number[]".to_string(),
                            "variadic<isize>" | "variadic<i8>" | "variadic<i16>"
                            | "variadic<i32>" | "variadic<i64>" | "variadic<BigInt>" => {
                                "number[]".to_string()
                            }
                            "List<bytes>"
                            | "List<utf-8 string>"
                            | "variadic<bytes>"
                            | "variadic<utf-8 string>" => "string[]".to_string(),
                            "List<bool>" | "variadic<bool>" => "boolean[]".to_string(),
                            _ => "string".to_string(),
                        };

                        struct_fields.push(Field {
                            name: field_name,
                            type_: field_type,
                            indexed: None,
                        });
                    }
                }

                custom_structs.insert(name.to_string(), struct_fields);
            }
        }
    }

    custom_structs
}
