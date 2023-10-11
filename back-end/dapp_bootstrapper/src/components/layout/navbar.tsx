import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { routesName } from '../../config/routes';
import Button from '../button';

export default function Navbar() {
  const isLoggedIn = useGetIsLoggedIn();

  const navigate = useNavigate();

  return (
    <nav className='flex w-full items-center border-b border-b-tertiary bg-secondary px-8 py-4'>
      <Link
        title='Home'
        to={routesName.home}
        className='mr-auto text-2xl font-bold transition-colors hover:text-accent-primary focus:text-accent-primary'
      >
        xDapp Starter
      </Link>

      {isLoggedIn ? (
        <Button title='Logout dApp' icon={faLock} onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        <Button
          title='Login dApp'
          icon={faUnlock}
          onClick={() => navigate(routesName.login)}
        >
          Login
        </Button>
      )}
    </nav>
  );
}
