import Dashboard from '../pages/dashboard';
import Home from '../pages/home';

export const routesName = {
  home: '/',
  dashboard: '/dashboard',
  login: '/login'
};

export const routes = [
  {
    path: routesName.home,
    page: Home
  },
  {
    path: routesName.dashboard,
    page: Dashboard,
    authenticatedRoute: true
  }
];
