import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Home } from './UserPages/Home';
import { createBrowserRouter, Navigate, RouterProvider, useLocation } from 'react-router-dom';
import { PATHS } from './Helpers/Paths';
import { Admin } from './UserPages/Admin';
import { Doctor } from './UserPages/Doctor';



const ProtectedRoute = ({ children, allowedType }) => {
  const location = useLocation(); // Move useLocation here
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('jwt');
  const path = location?.pathname;
  const requestedRoleView = path?.slice(1)?.toUpperCase();

  if (!token || requestedRoleView !== role) {
    return <Navigate to={PATHS.HOME} />;
  }
  return children;
};

const App = () => {

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <div className='main-container'><Home /></div>, 
    },
    {
      path: PATHS.ADMIN_PATH,
      element: (
        <ProtectedRoute allowedType="ADMIN">
          <Admin />
        </ProtectedRoute>
      ),
    },
    {
      path: PATHS.DOCTOR_PATH,
      element: (
        <ProtectedRoute allowedType="DOCTOR">
          <Doctor />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
