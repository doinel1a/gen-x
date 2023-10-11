import SmartContractForm from '@/components/smart-contract-form';
import React from 'react';

export default function Home() {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center'>
      <section
        aria-labelledby='sc-details-title'
        className='rounded-lg border border-border bg-secondary p-5 shadow-lg'
      >
        <h2 id='sc-details-title' className='mb-5 text-xl font-semibold'>
          Smart contract details
        </h2>

        <SmartContractForm />
      </section>
    </main>
  );
}
