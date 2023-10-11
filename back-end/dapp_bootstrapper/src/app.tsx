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
import { routesName } from './config/routes';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Login from './pages/login';

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
          <Route path={routesName.home} element={<Home />} />
          <Route path={routesName.dashboard} element={<Dashboard />} />
          <Route path={routesName.login} element={<Login />} />
        </Routes>
      </DappProvider>
    </BrowserRouter>
  );
}

export default App;
