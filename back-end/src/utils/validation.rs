use regex::Regex;

#[derive(Debug)]
pub struct ValidationResult {
    pub is_invalid: bool,
    pub message: String,
}

impl ValidationResult {
    pub fn new(is_invalid: bool, message: String) -> Self {
        ValidationResult {
            is_invalid,
            message,
        }
    }
}

pub fn address(key: &str, value: &str) -> ValidationResult {
    let initial_chars_regex = Regex::new(r"^erd1").unwrap();

    let checks = [
        (
            !initial_chars_regex.is_match(value),
            format!("'{}' must start with 'erd1'.", key),
        ),
        (
            value.trim().len() != 62,
            format!("'{}' must be 62 characters long.", key),
        ),
    ];

    for (is_invalid, message) in checks {
        if is_invalid {
            return ValidationResult::new(true, message.to_string());
        }
    }

    ValidationResult::new(false, "".to_string())
}

pub fn string(key: &str, value: &str) -> ValidationResult {
    let no_special_chars_regex = Regex::new(r"^[a-z0-9]*$").unwrap();

    let checks = [
        (
            value.is_empty() || value.trim().is_empty(),
            format!("'{}' is required.", key),
        ),
        (
            value.replace(" ", "").parse::<u64>().is_ok(),
            format!("'{}' can not be a number.", key),
        ),
        (
            !no_special_chars_regex.is_match(value),
            format!("'{}' must not contain special charactes.", key),
        ),
    ];

    for (is_invalid, message) in checks {
        if is_invalid {
            return ValidationResult::new(true, message.to_string());
        }
    }

    ValidationResult::new(false, "".to_string())
}
