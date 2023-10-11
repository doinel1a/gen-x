import { cn } from '@/lib/utils';
import React from 'react';
import InputWrapper from './input-wrapper';
import Label from './label';

interface IInputText extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const InputText = React.forwardRef<HTMLInputElement, IInputText>(function InputText(
  { label, errorMessage, id, className, ...props },
  ref
) {
  return (
    <InputWrapper>
      <>
        <Label errorMessage={errorMessage} htmlFor={id}>
          {label}
        </Label>

        <input
          ref={ref}
          id={id}
          type='text'
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
      </>
    </InputWrapper>
  );
});

export default InputText;
