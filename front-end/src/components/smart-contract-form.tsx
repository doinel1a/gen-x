'use client';

import { SmartContractSchema, SmartContractType } from '@/schemas/smart-contract';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileInput, FileJson2, UploadCloud } from 'lucide-react';
import React, { useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { Button } from './ui/button';
import InputFile from './ui/input-file';
import InputText from './ui/input-text';

export default function SmartContractForm() {
  const [isDragging, setIsDragging] = useState(false);

  // eslint-disable-next-line unicorn/no-useless-undefined
  const [smartContractABI, setSmartContractABI] = useState<File | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<SmartContractType>({ resolver: zodResolver(SmartContractSchema) });

  function onFileDrag(event: React.DragEvent<HTMLFormElement | HTMLInputElement>) {
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setIsDragging(true);
    } else if (event.type === 'dragleave') {
      setIsDragging(false);
    } else {
      setIsDragging(false);
    }
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];

      setSmartContractABI(uploadedFile);
    }
  }

  async function onSubmit(data: FieldValues) {
    console.log('data', data);

    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  return (
    <form
      className='flex w-96 flex-col gap-y-5'
      onDragEnter={onFileDrag}
      onDragOver={onFileDrag}
      onDragLeave={onFileDrag}
      onDrop={() => setIsDragging(false)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputText
        label='Address'
        errorMessage={errors.address?.message}
        id='address'
        placeholder='erd1. . . . .'
        autoComplete='off'
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={true}
        {...register('address')}
      />

      <InputFile
        label='ABI file'
        errorMessage={errors.abi?.message}
        id='abi'
        className={isDragging ? 'ring-2 ring-ring ring-offset-2' : undefined}
        {...register('abi')}
        onChange={onFileChange}
      >
        {smartContractABI === undefined ? (
          <>
            {isDragging ? <FileInput className='h-8 w-8' /> : <UploadCloud className='h-8 w-8' />}

            <span>
              {isDragging ? 'Yes, right here' : 'Click, or drag and drop the ABI file here'}
            </span>
          </>
        ) : (
          <>
            <FileJson2 className='h-8 w-8' />
            <span>{smartContractABI.name}</span>
          </>
        )}
      </InputFile>

      <Button type='submit' className='mt-2.5'>
        Generate
      </Button>
    </form>
  );
}
