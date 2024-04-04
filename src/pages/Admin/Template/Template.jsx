/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import fetchData from '../../../services/api/call.api';
import AdminTable from '../../../components/Common/Table/AdminTable';
import AdminSearch from '../../../components/Common/Search/AdminSearch';
import AdminForm from '../../../components/Common/Forms/AdminForm';
import CrudModal from '../../../components/Common/Modal/CrudModal';

function AdminTemplate({
  route, title = 'Admin', optionsList,
}) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('AJOUTER');
  const [modalMode, setModalMode] = useState('create');
  const [itemSelected, setItemSelected] = useState(null);
  const [optionsUpdate, setOptionsUpdate] = useState([]);

  const handleSearch = (column, search) => {
    const filteredDatas = data.filter((item) => {
      if (!column) {
        return item.id.toString().toLowerCase().includes(search.toLowerCase());
      }
      return item[column].toString().toLowerCase().includes(search.toLowerCase());
    });
    setSearchTerm(search);
    setSearchColumn(column);
    setFilteredData(filteredDatas);
  };

  const getAllData = async () => {
    const dataList = await fetchData('GET', route, null, true);
    setFilteredData(dataList);
    setData(dataList);
  };

  const handleDataCreate = (newData) => {
    const updatedData = [...data, newData];
    setData(updatedData);
  };

  const handleDataUpdate = (newData) => {
    setData((prevData) => prevData.map((item) => (item.id === newData.id ? newData : item)));
  };

  const handleDataDelete = (idToDelete) => {
    const updatedDatas = data.filter((item) => item.id !== idToDelete);
    const updatedData = updatedDatas;
    setData(updatedData);
  };

  const handleOpenCreateModal = () => {
    optionsList.forEach((option) => {
      delete option.src;
    });
    setModalTitle('AJOUTER');
    setModalMode('create');
    setIsModalVisible(true);
  };

  const handleOpenUpdateModal = (item) => {
    const optionForUpdate = optionsList.map((obj) => ({ ...obj }));
    Object.keys(item).forEach((key) => {
      optionsList.forEach((objetOptions, index) => {
        if (objetOptions.id === key && objetOptions.type !== 'file') {
          optionForUpdate[index].defaultValue = item[key];
        }
        if (objetOptions.type === 'file' || objetOptions.type === 'password') {
          if (objetOptions.id === 'url_image') {
            optionForUpdate[index].src = item.url_image;
          }
          delete optionForUpdate[index].required;
        }
      });
    });
    setItemSelected(item);
    setOptionsUpdate(optionForUpdate);
    setModalTitle('MODIFIER');
    setModalMode('update');
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getAllData();
  }, [route]);

  useEffect(() => {
    handleSearch(searchColumn, searchTerm);
  }, [data, searchColumn]);

  return (
    <>
      <h1>{title}</h1>
      <AdminSearch datas={data} onSearch={handleSearch} />
      <button
        type="button"
        className="add-button"
        aria-label="open create modal"
        onClick={handleOpenCreateModal}
      >
        +
      </button>
      <AdminTable
        filteredDatas={filteredData}
        route={route}
        handleDataDelete={handleDataDelete}
        handleOpenUpdateModal={handleOpenUpdateModal}
      />
      {isModalVisible
        && (
        <CrudModal handleClose={handleCloseModal} title={modalTitle} mode={modalMode}>
          <AdminForm
            optionsList={optionsList}
            optionsUpdate={optionsUpdate}
            route={route}
            handleDataCreate={handleDataCreate}
            handleDataUpdate={handleDataUpdate}
            modalMode={modalMode}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
          />
        </CrudModal>
        )}
    </>
  );
}

export default AdminTemplate;
