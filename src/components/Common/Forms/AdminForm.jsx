/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Input from '../Buttons/Input';
import fetchData from '../../../services/api/call.api';

function AdminForm({
  optionsList,
  optionsUpdate,
  route,
  handleDataCreate,
  handleClose, modalMode,
  itemSelected,
  setItemSelected,
  handleDataUpdate,
}) {
  const [formData, setFormData] = useState({});
  const [formInit, setFormInit] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const initialForm = () => {
    const initialFormData = {};

    if (modalMode === 'create') {
      optionsList?.forEach((option) => {
        initialFormData[option.id] = option.defaultValue || '';
      });
    }

    if (modalMode === 'update') {
      optionsUpdate?.forEach((option) => {
        initialFormData[option.id] = option.defaultValue || '';
      });
    }
    setFormData(initialFormData);
  };

  useEffect(() => {
    if (optionsList && optionsList.length > 0 && !formInit) {
      initialForm();
      setFormInit(true);
    }
    if (optionsUpdate && optionsUpdate.length > 0 && !formInit) {
      initialForm();
      setFormInit(true);
    }
  }, [optionsList, formInit]);

  const handleInputChange = (id, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleFileChange = (id, event) => {
    setFormData({
      ...formData,
      [id]: event.target.files[0],
    });
    if (event.target.name === 'url_image') {
      document.querySelector('.image-preview').src = URL.createObjectURL(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.target.closest('form');

    if (formElement && formElement.checkValidity()) {
      if (!formData.password || !formData.passwordConfirm) {
        delete formData.password;
        delete formData.passwordConfirm;
      }
      const resultData = modalMode === 'create'
        ? await fetchData('POST', route, formData, true)
        : await fetchData('PATCH', `${route}/${itemSelected.id}`, formData, true);
      if (resultData) {
        if (modalMode === 'create') {
          handleDataCreate(resultData[0]);
          toast.success('Création réussie.');
        }
        if (modalMode === 'update') {
          handleDataUpdate(resultData[0]);
          toast.success('Modification réussie.');
        }
        setFormKey((prevKey) => prevKey + 1);
        setItemSelected(null);
        handleClose();
      }
    } else {
      toast.error('Certains champs du formulaire ne sont pas valides.');
    }
  };

  return (
    <form key={formKey} className="create-form" onSubmit={handleSubmit} encType="multipart/form-data">
      {modalMode === 'create' && optionsList && optionsList.map((options) => (
        <Input
          key={options.id}
          options={options}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
        />
      ))}

      {modalMode === 'update' && optionsUpdate && optionsUpdate.map((options) => (
        <Input
          key={options.id}
          options={options}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
        />
      ))}
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
          type="submit"
          className="is-success"
          onClick={(handleSubmit)}
          aria-label="Valid form"
        >
          Confirmer
        </button>
      </div>
    </form>
  );
}

export default AdminForm;
