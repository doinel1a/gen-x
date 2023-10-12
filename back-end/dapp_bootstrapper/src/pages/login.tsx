import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton
} from '@multiversx/sdk-dapp/UI';
import React from 'react';
import Layout from '../components/layout';
import AuthRedirectWrapper from '../components/layout/auth-redirect-wrapper';

const loginProperties = {
  callbackRoute: '/dashboard',
  nativeAuth: true
};

const className =
  '!rounded-sm !bg-accent-primary !px-6 !py-2 hover:!bg-accent-primary-state focus:!bg-accent-primary-state !transition-colors !border-none !text-color-light';

function LoginPage() {
  return (
    <Layout title='Login'>
      <section className='container flex h-min w-min flex-col rounded-sm border border-tertiary bg-secondary p-5'>
        <h1 className='text-center text-3xl'>Login</h1>
        <h2 className='mt-2 text-center text-2xl'>Pick a login method</h2>

        <div className='mt-8 flex gap-x-4'>
          <WebWalletLoginButton
            buttonClassName={className}
            loginButtonText='Web Wallet'
            {...loginProperties}
          />
          <ExtensionLoginButton
            buttonClassName={className}
            loginButtonText='DeFi Wallet'
            {...loginProperties}
          />
          <LedgerLoginButton
            buttonClassName={className}
            modalClassName='!text-color-dark'
            loginButtonText='Ledger'
            {...loginProperties}
          />
          <WalletConnectLoginButton
            buttonClassName={className}
            modalClassName='!text-color-dark'
            loginButtonText='xPortal App'
            {...loginProperties}
          />
        </div>
      </section>
    </Layout>
  );
}

export default function Login() {
  return (
    <AuthRedirectWrapper>
      <LoginPage />
    </AuthRedirectWrapper>
  );
}
