import { cn } from '@/lib/utils';
import React from 'react';
import InputWrapper from './input-wrapper';
import Label from './label';

interface IInputFile extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const InputFile = React.forwardRef<HTMLInputElement, IInputFile>(function InputFile(
  { label, errorMessage, id, className, children, ...props },
  ref
) {
  return (
    <InputWrapper>
      <>
        <Label errorMessage={errorMessage} htmlFor={id}>
          {label}
        </Label>

        <div className='relative'>
          <div className='pointer-events-none absolute flex h-20 w-full flex-col items-center justify-center gap-y-1.5 rounded-md border border-input bg-background px-3 py-2 text-center text-sm text-muted-foreground'>
            {children}
          </div>

          <input
            ref={ref}
            id={id}
            type='file'
            accept='.json'
            multiple={false}
            className={cn(
              'flex h-20 w-full cursor-pointer rounded-md bg-background ring-offset-background file:w-full file:border-0 file:bg-transparent file:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            {...props}
          />
        </div>
      </>
    </InputWrapper>
  );
});

export default InputFile;
