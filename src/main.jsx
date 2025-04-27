import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'leaflet/dist/leaflet.css';

import Layout from './Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Units from './pages/Units.jsx';
import UnitDetail from './pages/UnitDetail.jsx'
import MapView from './pages/MapView.jsx'
import MapOverview from './pages/MapOverview.jsx'
import UnitTracker from './pages/UnitTracker'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'units', element: <Units /> },
      { path: 'unit/:id', element: <UnitDetail /> },
      { path: 'live-map', element: <MapView />},
      { path: 'map-overview', element: <MapOverview /> },
      { path: 'track', element: <UnitTracker />},
      { path: '*', element: <NotFound />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
