import React from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function BaseInput({ id, label, ...props }: IProps) {
  return (
    <div className='flex flex-col gap-y-1'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type='text'
        className='rounded-sm border-2 border-accent-primary px-1 py-0 text-color-dark'
        {...props}
      />
    </div>
  );
}
