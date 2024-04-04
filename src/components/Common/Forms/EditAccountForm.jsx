/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import fetchData from '../../../services/api/call.api';

function EditAccountForm({
  accountDetails, setAccountDetails, handleClose, userId,
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Create an object with the updated account details
    const updatedData = {
      email: formData.get('email'),
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      birthdate: formData.get('birthdate'),
      address: formData.get('adress'),
      zipcode: formData.get('zipcode'),
      city: formData.get('city'),
      country: formData.get('country'),
    };

    // send updated account details to the API
    try {
      const responseData = await fetchData('PATCH', `users/${userId}`, updatedData, true);
      if (responseData) {
        setAccountDetails(responseData[0]);
        toast.success('Votre compte a été mis à jour avec succès !');
        // closing modal here
        handleClose();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations du compte :', error);
      toast.error('Une erreur est survenue lors de la mise à jour des informations du compte. Veuillez réessayer.');
    }
  };

  return (accountDetails && (
  <form className="form-account" onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="email">Email </label>
      <input type="email" id="email" name="email" defaultValue={accountDetails.email} />
    </div>
    <div className="form-group">
      <label htmlFor="firstname">Prénom </label>
      <input type="text" id="firstname" name="firstname" defaultValue={accountDetails.firstname} />
    </div>
    <div className="form-group">
      <label htmlFor="lastname">Nom </label>
      <input type="text" id="lastname" name="lastname" defaultValue={accountDetails.lastname} />
    </div>
    <div className="form-group">
      <label htmlFor="birthdate">Date de naissance </label>
      <input type="text" id="birthdate" name="birthdate" defaultValue={accountDetails.birthdate} />
    </div>
    <div className="form-group">
      <label htmlFor="adress">Adresse </label>
      <input type="text" id="adress" name="adress" defaultValue={accountDetails.address} />
    </div>
    <div className="form-group">
      <label htmlFor="zipcode">Code postal </label>
      <input type="text" id="zipcode" name="zipcode" defaultValue={accountDetails.zipcode} />
    </div>
    <div className="form-group">
      <label htmlFor="city">Ville </label>
      <input type="text" id="city" name="city" defaultValue={accountDetails.city} />
    </div>
    <div className="form-group">
      <label htmlFor="country">Pays </label>
      <input type="text" id="country" name="country" defaultValue={accountDetails.country} />
    </div>
    <button className="edit-button" type="submit">
      <FontAwesomeIcon className="icon-gretter-size" icon={faShare} />
      <span className="edit-account-text">Modifier le compte</span>
    </button>
  </form>
  )
  );
}

export default EditAccountForm;
