import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import React from 'react';
import { routes, routesName } from '../../config/routes';
import Footer from './footer';
import Head from './head';
import Navbar from './navbar';

interface IProperties {
  title: string;
  description?: string;
  keywords?: string;
  children: React.ReactNode;
}

export default function Layout({
  title,
  description,
  keywords,
  children
}: IProperties) {
  return (
    <AuthenticatedRoutesWrapper routes={routes} unlockRoute={routesName.login}>
      <Head title={title} description={description} keywords={keywords} />

      <Navbar />

      <main className='flex h-full w-full items-center justify-center'>
        {children}
      </main>

      <Footer />
    </AuthenticatedRoutesWrapper>
  );
}
