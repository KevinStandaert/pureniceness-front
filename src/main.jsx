import React from 'react';
import ReactDOM from 'react-dom/client';

// Import des fonctions pour création du routeur
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importation des composants
import App from './app';
import Home from './pages/Home';
import {
  Admin,
  UserAdmin,
  ArtistAdmin,
  LabelAdmin,
  AlbumAdmin,
  TrackAdmin,
  EventAdmin,
  MediaAdmin,
  MessageAdmin,
  Settings,
} from './pages/Admin';
import Contact from './pages/Contact';
import Account from './pages/Account';
import Signup from './pages/Auth/Signup';
import Labels from './pages/Labels';
import Label from './pages/Label';
import Events from './pages/Events';
import Medias from './pages/Medias';
import Signin from './pages/Auth/Signin';
import UserProvider from './context/userContext';

// Création du routeur
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/admin',
        element: <Admin />,
        children:
        [
          { path: '/admin/users', element: <UserAdmin /> },
          { path: '/admin/artists', element: <ArtistAdmin /> },
          { path: '/admin/labels', element: <LabelAdmin /> },
          { path: '/admin/albums', element: <AlbumAdmin /> },
          { path: '/admin/tracks', element: <TrackAdmin /> },
          { path: '/admin/events', element: <EventAdmin /> },
          { path: '/admin/medias', element: <MediaAdmin /> },
          { path: '/admin/messages', element: <MessageAdmin /> },
          { path: '/admin/settings', element: <Settings /> },
        ],
      },
      { path: '/contact', element: <Contact /> },
      { path: '/account', element: <Account /> },
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
      { path: '/events', element: <Events /> },
      { path: '/medias', element: <Medias /> },
      {
        path: '/labels',
        element: <Labels />,
        children: [{ path: '/labels/:id', element: <Labels /> }],
      },
    ],
  },
]);

// RouterProvider permet à react-router-dom de checker les routes de notre application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
);