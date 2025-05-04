// Mackship10!@
// postgre - postgresql://postgres:[YOUR-PASSWORD]@db.lmuxngwcygjqrqdjmfgf.supabase.co:5432/postgres


import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'leaflet/dist/leaflet.css';

import { ROLES } from './constants/roles'

import { Toaster } from 'react-hot-toast'
import Contacts from './components/Contacts'
import DebugToken from './components/DebugToken'
import Layout from './Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Units from './pages/Units.jsx';
import UnitDetail from './pages/UnitDetail.jsx'
import MapView from './pages/MapView.jsx'
import MapOverview from './pages/MapOverview.jsx'
import UnitTracker from './pages/UnitTracker.jsx'
import Dispatcher from './pages/Dispatcher.jsx'
import LoginForm from './pages/LoginForm'
import DispatcherDashboard from './pages/DispatcherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import EMTDashboard from './pages/EMTDashboard'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'units', element: <Units /> },
      { path: 'unit/:id', element: <UnitDetail /> },
      { path: 'live-map', element: <MapView /> },
      { path: 'map-overview', element: <MapOverview /> },
      { path: 'track', element: <UnitTracker /> },
      { path: 'dispatcher', element: <Dispatcher /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'login', element: <LoginForm /> },
      { 
        element: <PrivateRoute requiredRole={ROLES.ADMIN} />,
        children: [
          { path: 'admin-dashboard', element: <AdminDashboard /> }
        ]
      },
      { 
        element: <PrivateRoute requiredRole={ROLES.EMT} />,
        children: [
          { path: 'emt-dashboard', element: <EMTDashboard /> }
        ]
      },
      { 
        element: <PrivateRoute requiredRole={ROLES.DISPATCHER} />,
        children: [
          { path: 'dispatcher-dashboard', element: <DispatcherDashboard /> }
        ]
      },
      { path: 'unauthorized', element: <div>You are not authorized to view this page.</div> },
      { path: '/debug-token', element:  <DebugToken /> },
      { path: '*', element: <NotFound />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);
        
