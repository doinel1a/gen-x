use std::collections::HashMap;

use crate::models::sc_abi::endpoint::{Endpoint, Mutability};
use crate::models::sc_abi::field::Field;
use crate::models::sc_abi::output::Output;
use crate::utils::string_mutation::StringMutation;

pub struct ReadonlyEndpointProps {
    pub hook_name: String,
    pub file_name: String,
    pub inputs: Vec<ReadonlyEndpointInput>,
    pub outputs: Vec<ReadonlyEndpointOutput>,
}

pub struct ReadonlyEndpointInput {
    pub name: String,
    pub type_: String,
    pub args_serializer: String,
}

pub struct ReadonlyEndpointOutput {
    pub getter: String,
    pub setter: String,
    pub type_: String,
    pub initial_value: String,
}

pub fn get_readonly_endpoints_props(
    endpoints: &Vec<Endpoint>,
) -> HashMap<String, ReadonlyEndpointProps> {
    let mut endpoint_props: HashMap<String, ReadonlyEndpointProps> = Default::default();

    for endpoint in endpoints {
        match endpoint.mutability() {
            Mutability::Mutable => {}
            Mutability::Readonly => {
                let endpoint_hook_name = format!(
                    "use{}",
                    endpoint
                        .name()
                        .to_string()
                        .snake_to_camel_case()
                        .capitalize_first_letter()
                );
                let endpoint_file_name = endpoint.name().to_string().snake_to_kebab_case();
                let endpoint_inputs = get_readonly_endpoint_inputs(endpoint.inputs());
                let endpoint_outputs = get_readonly_endpoints_outputs(endpoint.outputs());

                endpoint_props.insert(
                    endpoint.name().to_string(),
                    ReadonlyEndpointProps {
                        hook_name: endpoint_hook_name,
                        file_name: endpoint_file_name,
                        inputs: endpoint_inputs,
                        outputs: endpoint_outputs,
                    },
                );
            }
        }
    }

    endpoint_props
}

fn get_readonly_endpoint_inputs(inputs: &Vec<Field>) -> Vec<ReadonlyEndpointInput> {
    let mut endpoint_inputs = Vec::<ReadonlyEndpointInput>::new();

    for input in inputs {
        match input.type_().as_str() {
            "Address" => endpoint_inputs.push(ReadonlyEndpointInput {
                name: input.name().to_string(),
                type_: "string".to_string(),
                args_serializer: "AddressValue".to_string(),
            }),
            "usize" | "u8" | "u16" | "u32" | "u64" | "BigUint" => {
                endpoint_inputs.push(ReadonlyEndpointInput {
                    name: input.name().to_string(),
                    type_: "number".to_string(),
                    args_serializer: match input.type_().as_str() {
                        "usize" => "U8Value".to_string(),
                        "u8" => "U8Value".to_string(),
                        "u16" => "U16Value".to_string(),
                        "u32" => "U32Value".to_string(),
                        "u64" => "U64Value".to_string(),
                        "BigUint" => "BigUIntValue".to_string(),
                        _ => "".to_string(),
                    },
                })
            }
            "isize" | "i8" | "i16" | "i32" | "i64" | "BigInt" => {
                endpoint_inputs.push(ReadonlyEndpointInput {
                    name: input.name().to_string(),
                    type_: "number".to_string(),
                    args_serializer: match input.type_().as_str() {
                        "isize" => "I8Value".to_string(),
                        "i8" => "I8Value".to_string(),
                        "i16" => "I16Value".to_string(),
                        "i32" => "I32Value".to_string(),
                        "i64" => "I64Value".to_string(),
                        "BigInt" => "BigIntValue".to_string(),
                        _ => "".to_string(),
                    },
                })
            }
            "bytes" | "utf-8 string" => endpoint_inputs.push(ReadonlyEndpointInput {
                name: input.name().to_string(),
                type_: "string".to_string(),
                args_serializer: "BytesValue".to_string(),
            }),
            "bool" => endpoint_inputs.push(ReadonlyEndpointInput {
                name: input.name().to_string(),
                type_: "boolean".to_string(),
                args_serializer: "BooleanValue".to_string(),
            }),
            "List<Address>" | "variadic<Address>" => endpoint_inputs.push(ReadonlyEndpointInput {
                name: input.name().to_string(),
                type_: "string[]".to_string(),
                args_serializer: "".to_string(),
            }),
            "List<usize>" | "List<u8>" | "List<u16>" | "List<u32>" | "List<u64>"
            | "List<BigUint>" => endpoint_inputs.push(ReadonlyEndpointInput {
                name: input.name().to_string(),
                type_: "number[]".to_string(),
                args_serializer: "".to_string(),
            }),
            "variadic<usize>" | "variadic<u8>" | "variadic<u16>" | "variadic<u32>"
            | "variadic<u64>" | "variadic<BigUint>" => {
                endpoint_inputs.push(ReadonlyEndpointInput {
                    name: input.name().to_string(),
                    type_: "number[]".to_string(),
                    args_serializer: "".to_string(),
                })
            }
            "List<isize>" | "List<i8>" | "List<i16>" | "List<i32>" | "List<i64>"
            | "List<BigInt>" => endpoint_inputs.push(ReadonlyEndpointInput {
                name: input.name().to_string(),
                type_: "number[]".to_string(),
                args_serializer: "".to_string(),
            }),
            "variadic<isize>" | "variadic<i8>" | "variadic<i16>" | "variadic<i32>"
            | "variadic<i64>" | "variadic<BigInt>" => endpoint_inputs.push(ReadonlyEndpointInput {
                name: input.name().to_string(),
                type_: "number".to_string(),
                args_serializer: "".to_string(),
            }),
            "List<bytes>" | "List<utf-8 string>" | "variadic<bytes>" | "variadic<utf-8 string>" => {
                endpoint_inputs.push(ReadonlyEndpointInput {
                    name: input.name().to_string(),
                    type_: "string[]".to_string(),
                    args_serializer: "".to_string(),
                })
            }
            "List<bool>" | "variadic<bool>" => endpoint_inputs.push(ReadonlyEndpointInput {
                name: input.name().to_string(),
                type_: "boolean[]".to_string(),
                args_serializer: "".to_string(),
            }),
            _ => {}
        }
    }

    endpoint_inputs
}

fn get_readonly_endpoints_outputs(outputs: &Vec<Output>) -> Vec<ReadonlyEndpointOutput> {
    let mut endpoint_outputs = Vec::<ReadonlyEndpointOutput>::new();

    for output in outputs {
        match output.type_().as_str() {
            "Address" => endpoint_outputs.push(ReadonlyEndpointOutput {
                getter: "address".to_string(),
                setter: "setAddress".to_string(),
                type_: "string".to_string(),
                initial_value: "\"\"".to_string(),
            }),
            "usize" | "u8" | "u16" | "u32" | "u64" | "BigUint" => {
                endpoint_outputs.push(ReadonlyEndpointOutput {
                    getter: "numb".to_string(),
                    setter: "setNumb".to_string(),
                    type_: "number".to_string(),
                    initial_value: "0".to_string(),
                })
            }
            "isize" | "i8" | "i16" | "i32" | "i64" | "BigInt" => {
                endpoint_outputs.push(ReadonlyEndpointOutput {
                    getter: "numb".to_string(),
                    setter: "setNumb".to_string(),
                    type_: "number".to_string(),
                    initial_value: "0".to_string(),
                })
            }
            "bytes" | "utf-8 string" => endpoint_outputs.push(ReadonlyEndpointOutput {
                getter: "str".to_string(),
                setter: "setStr".to_string(),
                type_: "string".to_string(),
                initial_value: "0".to_string(),
            }),
            "bool" => endpoint_outputs.push(ReadonlyEndpointOutput {
                getter: "bool".to_string(),
                setter: "setBool".to_string(),
                type_: "boolean".to_string(),
                initial_value: "false".to_string(),
            }),
            "List<Address>" | "variadic<Address>" => {
                endpoint_outputs.push(ReadonlyEndpointOutput {
                    getter: "arrayAddress".to_string(),
                    setter: "setArrayAddress".to_string(),
                    type_: "string[]".to_string(),
                    initial_value: "[]".to_string(),
                })
            }
            "List<usize>" | "List<u8>" | "List<u16>" | "List<u32>" | "List<u64>"
            | "List<BigUint>" => endpoint_outputs.push(ReadonlyEndpointOutput {
                getter: "arrayNumber".to_string(),
                setter: "setArrayNumber".to_string(),
                type_: "number[]".to_string(),
                initial_value: "[]".to_string(),
            }),
            "variadic<usize>" | "variadic<u8>" | "variadic<u16>" | "variadic<u32>"
            | "variadic<u64>" | "variadic<BigUint>" => {
                endpoint_outputs.push(ReadonlyEndpointOutput {
                    getter: "arrayNumber".to_string(),
                    setter: "setArrayNumber".to_string(),
                    type_: "number[]".to_string(),
                    initial_value: "[]".to_string(),
                })
            }
            "List<isize>" | "List<i8>" | "List<i16>" | "List<i32>" | "List<i64>"
            | "List<BigInt>" => endpoint_outputs.push(ReadonlyEndpointOutput {
                getter: "arrayNumber".to_string(),
                setter: "setArrayNumber".to_string(),
                type_: "number[]".to_string(),
                initial_value: "[]".to_string(),
            }),
            "variadic<isize>" | "variadic<i8>" | "variadic<i16>" | "variadic<i32>"
            | "variadic<i64>" | "variadic<BigInt>" => {
                endpoint_outputs.push(ReadonlyEndpointOutput {
                    getter: "arrayNumber".to_string(),
                    setter: "setArrayNumber".to_string(),
                    type_: "number[]".to_string(),
                    initial_value: "[]".to_string(),
                })
            }
            "List<bytes>" | "List<utf-8 string>" | "variadic<bytes>" | "variadic<utf-8 string>" => {
                endpoint_outputs.push(ReadonlyEndpointOutput {
                    getter: "arrayString".to_string(),
                    setter: "setArrayString".to_string(),
                    type_: "string[]".to_string(),
                    initial_value: "[]".to_string(),
                })
            }
            "List<bool>" | "variadic<bool>" => endpoint_outputs.push(ReadonlyEndpointOutput {
                getter: "arrayBool".to_string(),
                setter: "setArrayBool".to_string(),
                type_: "boolean[]".to_string(),
                initial_value: "[]".to_string(),
            }),
            _ => {}
        }
    }

    endpoint_outputs
}