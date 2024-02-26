/* eslint-disable react/no-unescaped-entities */
import './index.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faUser, faStar } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import fetchData from '../../services/api/call.api';
import Infos from './Infos';
import Favorites from './Favorites';
import DeleteAccount from './DeleteAccount';
import EditAccount from './EditAccount';

function Account() {
  const token = localStorage.getItem('authApiToken');
  const decodedToken = jwtDecode(token);
  const { userId } = decodedToken;
  const [accountDetails, setAccountDetails] = useState([]);

  const fetchAccountData = async (id) => {
    const fetchedData = await fetchData('GET', `users/${id}`, null, true);
    const accountData = fetchedData[0];
    setAccountDetails(accountData);
  };

  useEffect(() => {
    fetchAccountData(userId);
  }, [userId]);

  // console.log(accountDetails.birthdate);

  return (
    <div className="profil">
      <div className="profil-container">
        <div className="return-icon">
          <NavLink to="/">
            <FontAwesomeIcon className="icon-gretter-size" icon={faReply} />
          </NavLink>
        </div>
        <h1 id="h1-profil">PROFIL</h1>
        <div className="profil-icons">
          <a href="#informations">
            <FontAwesomeIcon className="icon-gretter-size" icon={faUser} />
            Mes informations
          </a>
          <a href="#favorites">
            <FontAwesomeIcon className="icon-gretter-size" icon={faStar} />
            Mes favoris
          </a>
        </div>
      </div>
      <div>
        <Infos
          accountDetails={accountDetails}
        />
        <EditAccount
          accountDetails={accountDetails}
          setAccountDetails={setAccountDetails}
          userId={userId}
        />
      </div>
      <div className="favorite-icon">
        <h2 id="favorites">Favoris</h2>
      </div>
      <div>
        <Favorites userId={userId} />
      </div>
      <div
        className="delete-account"
        aria-label="Delete Account"
      >
        <DeleteAccount userId={userId} />
      </div>
    </div>
  );
}

export default Account;
