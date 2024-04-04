/* eslint-disable react/no-unescaped-entities */
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

function Infos({ accountDetails }) {
  // Using a local for stocking account informations
  const [localAccountDetails, setLocalAccountDetails] = useState(accountDetails);

  // Updating local account informations when accountDetails change
  useEffect(() => {
    setLocalAccountDetails(accountDetails);
  }, [accountDetails]);

  return (
    <div>
      <div className="info-title">
        <FontAwesomeIcon className="icon-gretter-size" icon={faUser} />
        <h2 id="informations">Informations personnelles</h2>
      </div>
      <div className="account">
        <p className="account-details">
          <span>Email :</span>
          {localAccountDetails.email}
        </p>
        <p className="account-details">
          <span>Prénom :</span>
          {localAccountDetails.firstname}
        </p>
        <p className="account-details">
          <span>Nom :</span>
          {localAccountDetails.lastname}
        </p>
        <p className="account-details">
          <span>Date de naissance :</span>
          {localAccountDetails.birthdate}
        </p>
        <p className="account-details">
          <span>Adresse :</span>
          {localAccountDetails.address}
        </p>
        <p className="account-details">
          <span>Code postal :</span>
          {localAccountDetails.zipcode}
        </p>
        <p className="account-details">
          <span>Ville :</span>
          {localAccountDetails.city}
        </p>
        <p className="account-details">
          <span>Pays :</span>
          {localAccountDetails.country}
        </p>
      </div>
    </div>
  );
}

export default Infos;
