/* eslint-disable jsx-a11y/label-has-associated-control */
import { cn } from '@/lib/utils';
import React from 'react';

interface ILabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
  errorMessage?: string;
}

export default function Label({ errorMessage, className, ...props }: ILabel) {
  return (
    <div>
      <label
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          errorMessage ? 'text-red-500' : '',
          className
        )}
        {...props}
      />

      <span className='text-sm font-medium leading-none text-red-500'>&nbsp;{errorMessage}</span>
    </div>
  );
}
