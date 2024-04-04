/* eslint-disable react/no-unescaped-entities */
import './index.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReply, faUser, faStar, faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import fetchData from '../../services/api/call.api';
import Infos from './Infos';
import Favorites from './Favorites';
import DeleteAccount from './DeleteAccount';
import EditAccount from './EditAccount';
import EditPassword from './EditPassword';

function Account() {
  const token = localStorage.getItem('authApiToken');
  const decodedToken = jwtDecode(token);
  const { userId } = decodedToken;
  const [accountDetails, setAccountDetails] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);

  // function to open a form modal to edit account
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  // function to close a form modal to edit account
  const handleClose = () => {
    setIsModalVisible(false);
    setPasswordEdit(false);
  };

  const fetchAccountData = async (id) => {
    const fetchedData = await fetchData('GET', `users/${id}`, null, true);
    const accountData = fetchedData[0];
    setAccountDetails(accountData);
  };

  useEffect(() => {
    fetchAccountData(userId);
  }, [userId]);

  return (
    <div className="profil">
      <div className="profil-container">
        <div className="return-icon">
          <NavLink to="/">
            <FontAwesomeIcon className="icon-gretter-size" icon={faReply} />
          </NavLink>
        </div>
        <h1 className="h1-profil">PROFIL</h1>
        <div className="profil-icons">
          <a href="#informations">
            <FontAwesomeIcon className="icon-gretter-size" icon={faUser} />
            <span>Mes informations</span>
          </a>
          <a href="#favorites">
            <FontAwesomeIcon className="icon-gretter-size" icon={faStar} />
            <span>Mes favoris</span>
          </a>
        </div>
      </div>
      <div>
        <Infos
          accountDetails={accountDetails}
        />
        <div className="edit-button-container">
          <div className="edit-profil-button" onClick={handleOpenModal}>
            <FontAwesomeIcon className="icon-gretter-size" icon={faUserPen} />
            <span className="edit-account-text">Informations</span>
          </div>
          <div className="edit-profil-button" onClick={() => { setPasswordEdit(true); handleOpenModal(); }}>
            <FontAwesomeIcon className="icon-gretter-size" icon={faUserPen} />
            <span className="edit-account-text">Mot de passe</span>
          </div>
        </div>

        {isModalVisible && (
          passwordEdit ? (
            <EditPassword
              userId={userId}
              handleClose={handleClose}
              handleOpenModal={handleOpenModal}
              setPasswordEdit={setPasswordEdit}
            />
          ) : (
            <EditAccount
              accountDetails={accountDetails}
              setAccountDetails={setAccountDetails}
              userId={userId}
              handleClose={handleClose}
              handleOpenModal={handleOpenModal}
            />
          )
        )}
      </div>
      <div className="favorite-title">
        <FontAwesomeIcon className="icon-gretter-size" icon={faStar} />
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
