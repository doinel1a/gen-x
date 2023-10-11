import { cn } from '@/lib/utils';
import React from 'react';

interface IInputWrapper extends React.HTMLAttributes<HTMLDivElement> {}

export default function InputWrapper({ className, ...props }: IInputWrapper) {
  return <div className={cn('flex flex-col gap-y-2.5', className)} {...props} />;
}
