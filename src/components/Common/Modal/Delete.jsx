/* eslint-disable react/prop-types */
import { useState } from 'react';
import './modal.css';

function DeleteModal({
  text, handleClose, handleConfirm, mode,
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return isVisible ? (
    <div className="modal" aria-label="Close modal" onClick={handleModalClick}>
      <div className={`modal-content modal-style-${mode}`}>
        <button
          type="button"
          className="close close-modal-btn"
          aria-label="Close modal"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="modal__title">SUPPRIMER</h2>
        <div className="modal__body">
          <p>Voulez-vous vraiment supprimer cet élément ?</p>
          <p>L&apos;action sera irréversible et supprimera tous les éléments qui lui sont liés.</p>
          <div className="modal-submit-buttons">
            <button
              type="button"
              className="is-cancel close-modal-btn"
              onClick={handleClose}
              aria-label="Close modal"
            >
              Annuler
            </button>
            <button
              type="button"
              className="is-success"
              onClick={handleConfirm}
              value="Confirmer"
              aria-label="Confirm delete"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default DeleteModal;
