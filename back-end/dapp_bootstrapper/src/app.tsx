import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import {
  NotificationModal,
  SignTransactionsModals,
  TransactionsToastList
} from '@multiversx/sdk-dapp/UI';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { apiTimeout, walletConnectV2ProjectId } from './config/devnet';
import { routes } from './config/routes';

const className = '!text-color-dark';

function App() {
  return (
    <BrowserRouter>
      <DappProvider
        environment={EnvironmentsEnum.devnet}
        customNetworkConfig={{
          name: 'devnetConfig',
          apiTimeout,
          walletConnectV2ProjectId
        }}
      >
        <TransactionsToastList className={className} />
        <NotificationModal />
        <SignTransactionsModals />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} Component={route.page} />
          ))}
        </Routes>
      </DappProvider>
    </BrowserRouter>
  );
}

export default App;
