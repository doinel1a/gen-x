import React from 'react';
import BaseInput from './base-input';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function NumericInput({
  label,
  value,
  setValue,
  ...props
}: IProps) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as number);
  }

  return (
    <BaseInput
      label={label}
      type='text'
      inputMode='numeric'
      pattern='^-?\d*\.?\d*$'
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
