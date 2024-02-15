import './DropdownProfil.css';

import { useState, useEffect } from 'react';
import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../../../Common/Dropdown';

function DropdownProfil() {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const loggedLinks = [
    { id: 1, path: '/profil', label: 'Profil' },
    { id: 2, path: '/infos', label: 'Mes informations' },
    { id: 3, path: '/favorites', label: 'Mes favoris' },
    { id: 4, path: '/messages', label: 'Mes messages' },
    { id: 5, path: '/signout', label: 'Me déconnecter' },
  ];

  const loggedOutLinks = [
    { id: 1, path: '/signin', label: 'Se connecter' },
    { id: 2, path: '/signup', label: 'S\'inscrire' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('authApiToken');
    if (token) {
      setIsUserLogged(true);
    }
  }, []);

  return (
    isUserLogged ? (
      <div className="navbar-top-icon">
        <Dropdown title="" icon={faUser} links={loggedLinks} caret={false} />
      </div>
    ) : (
      <div className="navbar-top-icon">
        <Dropdown title="" icon={faRightToBracket} links={loggedOutLinks} caret={false} />
      </div>
    )
  );
}

export default DropdownProfil;