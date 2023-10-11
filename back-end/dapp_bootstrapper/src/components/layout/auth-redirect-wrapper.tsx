import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routesName } from '../../config/routes';

interface IProperties {
  children: React.ReactNode;
}

export default function AuthRedirectWrapper({ children }: IProperties) {
  const isLoggedIn = useGetIsLoggedIn();

  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate(routesName.dashboard);
  }

  return <>{children}</>;
}
