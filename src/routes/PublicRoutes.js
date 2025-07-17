import React from 'react';
import Home from '../components/pages/home/Home';
import NotFound from '../components/pages/notFound/NotFound';
import Login from '../components/pages/auth/Login';
import Register from '../components/pages/auth/Register';


/* ============ public Routes =============== */
export const publicRoutes = [
  { path: "/", Component: Home },
  { path: "/Login", Component: Login },
  { path: "/Register", Component: Register },
  { path: "*", Component: NotFound },
];


