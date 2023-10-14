use serde::de::{Deserialize, Deserializer, Error};
use serde::Serialize;

use crate::utils::validation;

#[derive(Serialize, Debug)]
pub struct SCAddress {
    sc_address: String,
}

impl SCAddress {
    pub fn sc_address(&self) -> &String {
        &self.sc_address
    }
}

impl<'de> Deserialize<'de> for SCAddress {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        const KEY: &str = "Smart contract address";

        let sc_address = String::deserialize(deserializer)?;

        let validation_string_response = validation::string(KEY, &sc_address);

        if validation_string_response.is_invalid {
            let error_message = format!("{:?}", validation_string_response.message);

            return Err(Error::custom(error_message));
        }

        let validation_address_response = validation::address(KEY, &sc_address);

        if validation_address_response.is_invalid {
            let error_message = format!("{:?}", validation_address_response.message);

            return Err(Error::custom(error_message));
        }

        Ok(Self {
            sc_address: sc_address.trim().to_string(),
        })
    }
}

#[test]
fn test_sc_address_correct() {
    let sc_address = "\"erd1qqqqqqqqqqqqqpgqtsw0630ynu4k750u325km90z2u32898cy9vqc0f9z3\"";

    let deserialized: Result<SCAddress, serde_json::Error> = serde_json::from_str(sc_address);

    assert!(deserialized.is_ok());
}

#[test]
fn test_sc_address_w_empty_input() {
    let sc_address = "\"\"";

    let deserialized: Result<SCAddress, serde_json::Error> = serde_json::from_str(sc_address);

    assert!(deserialized.is_err());

    if let Err(error_message) = deserialized {
        assert!(error_message.to_string().contains("is required"));
    }
}

#[test]
fn test_sc_address_w_two_spaces_input() {
    let sc_address = "\"  \"";

    let deserialized: Result<SCAddress, serde_json::Error> = serde_json::from_str(sc_address);

    assert!(deserialized.is_err());

    if let Err(error_message) = deserialized {
        assert!(error_message.to_string().contains("is required"));
    }
}

#[test]
fn test_sc_address_w_number_input() {
    let sc_address = "\"123\"";

    let deserialized: Result<SCAddress, serde_json::Error> = serde_json::from_str(sc_address);

    assert!(deserialized.is_err());

    if let Err(error_message) = deserialized {
        assert!(error_message.to_string().contains("can not be a number"));
    }
}

#[test]
fn test_sc_address_w_special_chars_input() {
    let sc_address = "\"erd1qqqqqqqqqqqqqpgqtsw0630ynu4k750u325km90z2u32898cy9vqc0f9z3!\"";

    let deserialized: Result<SCAddress, serde_json::Error> = serde_json::from_str(sc_address);

    assert!(deserialized.is_err());

    if let Err(error_message) = deserialized {
        assert!(error_message
            .to_string()
            .contains("must not contain special charactes"));
    }
}

#[test]
fn test_sc_address_w_input_not_starting_w_erd1() {
    let sc_address = "\"erd2qqqqqqqqqqqqqpgqtsw0630ynu4k750u325km90z2u32898cy9vqc0f9z3\"";

    let deserialized: Result<SCAddress, serde_json::Error> = serde_json::from_str(sc_address);

    assert!(deserialized.is_err());

    if let Err(error_message) = deserialized {
        assert!(error_message.to_string().contains("must start with 'erd1'"));
    }
}

#[test]
fn test_sc_address_w_input_61_chars_log() {
    let sc_address = "\"erd1qqqqqqqqqqqqqpgqtsw0630ynu4k750u325km90z2u32898cy9vqc0f9z\"";

    let deserialized: Result<SCAddress, serde_json::Error> = serde_json::from_str(sc_address);

    assert!(deserialized.is_err());

    if let Err(error_message) = deserialized {
        assert!(error_message
            .to_string()
            .contains("must be 62 characters long"));
    }
}

#[test]
fn test_sc_address_w_input_63_chars_log() {
    let sc_address = "\"erd1qqqqqqqqqqqqqpgqtsw0630ynu4k750u325km90z2u32898cy9vqc0f9z33\"";

    let deserialized: Result<SCAddress, serde_json::Error> = serde_json::from_str(sc_address);

    assert!(deserialized.is_err());

    if let Err(error_message) = deserialized {
        assert!(error_message
            .to_string()
            .contains("must be 62 characters long"));
    }
}
