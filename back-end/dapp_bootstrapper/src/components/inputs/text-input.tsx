import React from 'react';
import BaseInput from './base-input';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function TextInput({
  label,
  value,
  setValue,
  ...props
}: IProps) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <BaseInput
      label={label}
      type='text'
      inputMode='text'
      pattern='^[A-Za-z]+(?:\s[A-Za-z]+)*\s?$'
      value={value}
      onBeforeInput={onBeforeInput}
      onChange={onChange}
      {...props}
    />
  );
}

function onBeforeInput(event: React.FormEvent<HTMLInputElement>) {
  const target = event.target as HTMLInputElement;
  const beforeValue = target.value;

  target.addEventListener('input', function inputHandler() {
    if (target.validity.patternMismatch) {
      target.value = beforeValue;
    }

    target.removeEventListener('input', inputHandler);
  });
}
