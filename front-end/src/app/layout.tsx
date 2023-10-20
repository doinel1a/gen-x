import Nav from '@/components/nav';
import '../styles/globals.css';
import '../styles/globals.scss';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme/provider';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import React from 'react';
import favicon from '../assets/imgs/gen-x-favicon.svg';

export const metadata: Metadata = {
  title: 'gen X',
  description:
    'Automatically generate entire dApp starting from the ABI of smart contract in the MultiversX blockchain.',
  icons: favicon.src
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Nav />
          {children}
          <Analytics mode={'production'} />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
