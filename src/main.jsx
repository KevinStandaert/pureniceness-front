import React from 'react';
import ReactDOM from 'react-dom/client';

// Import des fonctions pour création du routeur
import { RouterProvider } from 'react-router-dom';

import router from './router/index';
import UserProvider from './context/userContext';
import PlayerProvider from './context/playerContext';

// RouterProvider permet à react-router-dom de checker les routes de notre application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlayerProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </PlayerProvider>
  </React.StrictMode>,
);
