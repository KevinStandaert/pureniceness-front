/* eslint-disable react/no-unescaped-entities */
import './index.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import fetchData from '../../../services/api/call.api';
import DeleteModal from '../../../components/Common/Modal/Delete';

function DeleteAccount({ userId }) {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // if no userId or userId = main administrator, don't show the delete account modal
  if ((!userId) || parseInt(userId, 10) === 1) {
    return null;
  }
  // text to display in the delete modal not implemented yet
  const text = 'Voulez-Vous vraiment supprimer votre compte ?';

  // delete account, remove token from local storage and redirect to home page
  const deleteElement = async () => {
    const isDelete = await fetchData('DELETE', `users/${userId}`, null, true);
    localStorage.removeItem('authApiToken');

    // hard refresh to update the user context
    window.location.href = '/';
    return isDelete;
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const handleConfirmDelete = async () => {
    const isDelete = await deleteElement();
    if (isDelete) {
      setIsDeleteModalVisible(false);
    }
  };

  // Function to handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleOpenDeleteModal();
    }
  };

  return (
    <>
      <div
      // Rend l'élément focusable
        tabIndex={0}
        onClick={handleOpenDeleteModal}
        onKeyDown={handleKeyDown}
        role="button"
      >
        <FontAwesomeIcon
          className="icon-gretter-size"
          icon={faTrashCan}
        />
        <span className="delete-account-text">Supprimer le compte</span>
      </div>
      {isDeleteModalVisible
      && (
        <DeleteModal
          handleClose={handleCloseDeleteModal}
          handleConfirm={handleConfirmDelete}
          mode="delete-user"
        />
      )}
    </>
  );
}

export default DeleteAccount;
