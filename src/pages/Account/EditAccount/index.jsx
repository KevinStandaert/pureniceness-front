/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import './index.css';
import { useState } from 'react';
import CrudModal from '../../../components/Common/Modal/CrudModal';
import EditAccountForm from '../../../components/Common/Forms/EditAccountForm';

function EditAccount({
  accountDetails, setAccountDetails, userId, handleClose,
}) {
  const [modalTitle] = useState('Mise à jour');

  // apply specific css to the modal
  const [modalMode] = useState('update-user');

  // if no userId, don't show the edit account modal
  if (!userId) {
    return null;
  }

  return (
    <CrudModal handleClose={handleClose} title={modalTitle} mode={modalMode}>
      <EditAccountForm
        accountDetails={accountDetails}
        setAccountDetails={setAccountDetails}
        userId={userId}
      />
    </CrudModal>
  );
}

export default EditAccount;
