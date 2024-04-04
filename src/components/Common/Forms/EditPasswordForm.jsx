/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import fetchData from '../../../services/api/call.api';

function EditPassword({
  handleClose, userId, setPasswordEdit,
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Create an object with the updated password
    const updatedData = {
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    if (updatedData.password !== updatedData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    // remove confirmPassword from the object
    delete updatedData.confirmPassword;

    // send updated password to the API
    try {
      const responseData = await fetchData('PATCH', `users/${userId}`, updatedData, true);
      if (responseData) {
        toast.success('Votre mot de passe a été mis à jour avec succès !');
        setPasswordEdit(false);
        // closing modal here
        handleClose();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de votre mot de passe :', error);
      toast.error('Une erreur est survenue lors de la mise à jour de votre mot de passe. Veuillez réessayer.');
    }
  };

  return (
    <form className="form-account" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="password">Mot de passe </label>
        <input type="password" id="password" name="password" />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmer </label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
      </div>
      <button className="edit-button" type="submit">
        <FontAwesomeIcon className="icon-gretter-size" icon={faShare} />
        <span className="edit-account-text">Modifier</span>
      </button>
    </form>
  );
}

export default EditPassword;
