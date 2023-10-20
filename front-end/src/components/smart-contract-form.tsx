'use client';

import { BACK_END_BASE_URL } from '@/config/urls';
import { cn } from '@/lib/utils';
import { SmartContractSchema, SmartContractType } from '@/schemas/smart-contract';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileInput, FileJson2, Loader2, UploadCloud } from 'lucide-react';
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

  // eslint-disable-next-line unicorn/consistent-function-scoping
  async function onSubmit(data: FieldValues) {
    console.log('data', data);

    const smartContractAbiAsString = await new Response(data.abi[0]).json();
    console.log('smartContractAbiAsString', smartContractAbiAsString);

    const generationResponse = await fetch(`${BACK_END_BASE_URL}/api/v1/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sc_address: data.address,
        sc_abi: smartContractAbiAsString
      })
    });

    if (!generationResponse.ok) {
      // TODO: Error toast

      return;
    }

    const contentDispositionHeader = generationResponse.headers.get('content-disposition');
    const templateName = contentDispositionHeader?.match(/filename=(.+)/)?.[1] || 'template.zip';

    const generationBlob = await generationResponse.blob();
    const blobUrl = URL.createObjectURL(generationBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = templateName;
    document.body.append(downloadLink);
    downloadLink.click();

    downloadLink.remove();
    URL.revokeObjectURL(blobUrl);
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

      <Button
        type='submit'
        className={cn(`mt-2.5 ${isSubmitting ? 'animate-pulse' : ''}`)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className='flex items-center justify-center gap-x-3'>
            <Loader2 className='animate-spin' />
            <p>Generating . . .</p>
          </div>
        ) : (
          'Generate'
        )}
      </Button>
    </form>
  );
}
