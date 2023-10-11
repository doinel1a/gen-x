import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import React from 'react';
import Layout from '../components/layout';

export default function Dashboard() {
  useGetAccountInfo();

  return (
    <Layout title='Dashboard'>
      <div className='container flex flex-col items-center justify-between rounded-sm border border-tertiary bg-secondary py-5'>
        <div className='flex gap-x-5'></div>
      </div>
    </Layout>
  );
}
