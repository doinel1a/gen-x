import React from 'react';
import Layout from '../components/layout';
import AuthRedirectWrapper from '../components/layout/auth-redirect-wrapper';

function HomePage() {
  return (
    <Layout title='Home'>
      <h1 className='text-2xl font-semibold'>
        dApp bootstrapped with{' '}
        <a
          href='https://genX.d1a.app'
          target='_blank'
          rel='noreferrer'
          className='text-3xl font-bold text-accent-primary hover:text-accent-primary-state focus:text-accent-primary-state'
        >
          gen X
        </a>
      </h1>
    </Layout>
  );
}

export default function Home() {
  return (
    <AuthRedirectWrapper>
      <HomePage />
    </AuthRedirectWrapper>
  );
}
