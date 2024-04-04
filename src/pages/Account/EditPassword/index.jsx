/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
// import './index.css';
import { useState } from 'react';
import CrudModal from '../../../components/Common/Modal/CrudModal';
import EditPasswordForm from '../../../components/Common/Forms/EditPasswordForm';

function EditPassword({
  userId, handleClose, setPasswordEdit,
}) {
  const [modalTitle] = useState('Mot de passe');

  // apply specific css to the modal
  const [modalMode] = useState('update-user');

  // if no userId don't show the edit password modal
  if (!userId) {
    return null;
  }

  return (
    <CrudModal handleClose={handleClose} title={modalTitle} mode={modalMode}>
      <EditPasswordForm
        userId={userId}
        setPasswordEdit={setPasswordEdit}
      />
    </CrudModal>
  );
}

export default EditPassword;
