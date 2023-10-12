import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routes, routesName } from '../../config/routes';
import Button from '../button';

export default function Navbar() {
  const isLoggedIn = useGetIsLoggedIn();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className='flex w-full items-center border-b border-b-tertiary bg-secondary px-8 py-4'>
      <Link
        title='Home'
        to={routesName.home}
        className='mr-auto text-2xl font-bold transition-colors hover:text-accent-primary focus:text-accent-primary'
      >
        gen X
      </Link>

      {isLoggedIn && (
        <ul className='mr-10 flex h-full items-center justify-end gap-x-5'>
          {routes.map(
            (route) =>
              route.label !== 'undefined' && (
                <li key={route.path}>
                  <Link
                    title={route.label}
                    to={route.path}
                    className={
                      pathname === route.path
                        ? 'text-blue-500 underline'
                        : 'text-blue-400 hover:text-blue-500 focus:text-blue-500'
                    }
                  >
                    {route.label}
                  </Link>
                </li>
              )
          )}
        </ul>
      )}

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
