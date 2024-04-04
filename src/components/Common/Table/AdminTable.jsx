/* eslint-disable react/prop-types */

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan, faPen, faPeopleGroup, faCompactDisc, faMusic,
} from '@fortawesome/free-solid-svg-icons';
import styles from './AdminTable.module.css';
import DeleteModal from '../Modal/Delete';
import fetchData from '../../../services/api/call.api';
import AddModal from '../Modal/Add';
import AlbumModal from '../Modal/AlbumModal';
import TrackModal from '../Modal/TrackModal';

function AdminTable({
  filteredDatas, handleDataDelete, handleOpenUpdateModal, route,
}) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [albumModalVisible, setAlbumModalVisible] = useState(false);
  const [trackModalVisible, setTrackModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const deleteElement = async () => {
    const isDelete = await fetchData('DELETE', `${route}/${selectedItem.id}`, null, true);
    return isDelete;
  };

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleOpenAddModal = (item) => {
    setIsAddModalVisible(true);
    setSelectedItem(item);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
    setSelectedItem(null);
  };

  const handleOpenAlbumModal = (item) => {
    setAlbumModalVisible(true);
    setSelectedItem(item);
  };
  const handleCloseAlbumModal = () => {
    setAlbumModalVisible(false);
    setSelectedItem(null);
  };

  const handleOpenTrackModal = (item) => {
    setTrackModalVisible(true);
    setSelectedItem(item);
  };
  const handleCloseTrackModal = () => {
    setTrackModalVisible(false);
    setSelectedItem(null);
  };

  const handleOpenDeleteModal = (item) => {
    setIsDeleteModalVisible(true);
    setSelectedItem(item);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setSelectedItem(null);
  };

  const handleConfirmDelete = async () => {
    const isDelete = await deleteElement();

    if (isDelete) {
      handleDataDelete(selectedItem.id);
      setIsDeleteModalVisible(false);
      setSelectedItem(null);
    }
  };

  if (filteredDatas.length) {
    return (
      <>
        <div className={styles.container}>
          <table className="table is-bordered is-hoverable is-fullwidth">
            <thead>
              <tr>
                {Object.keys(filteredDatas[0]).map((columnName) => (
                  <th className="has-text-centered has-text-white" key={columnName}>{columnName}</th>
                ))}
                {route === 'admin/tracks' ? (
                  <th className="has-text-centered has-text-white">
                    Artistes
                  </th>
                ) : null}
                {route === 'admin/labels' ? (
                  <th className="has-text-centered has-text-white">
                    Albums
                  </th>
                ) : null}
                {route === 'admin/albums' ? (
                  <th className="has-text-centered has-text-white">
                    Sons
                  </th>
                ) : null}
                <th className="has-text-centered has-text-white">Modifier</th>
                <th className="has-text-centered has-text-white">Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {filteredDatas.map((data) => (
                <tr
                  key={data.id}
                  onClick={() => handleRowClick(data.id)}
                  className={selectedRow === data.id ? 'is-selected' : ''}
                >
                  {Object.keys(data).map((columnName) => (
                    <td key={columnName}>{data[columnName]}</td>
                  ))}

                  {route === 'admin/tracks' ? (
                    <td>
                      <button
                        className="is-danger"
                        type="button"
                        onClick={() => handleOpenAddModal(data)}
                        aria-label="add"
                      >
                        <FontAwesomeIcon icon={faPeopleGroup} />
                      </button>
                    </td>
                  ) : null}

                  {route === 'admin/labels' ? (
                    <td>
                      <button
                        className="is-danger"
                        type="button"
                        onClick={() => handleOpenAlbumModal(data)}
                        aria-label="add"
                      >
                        <FontAwesomeIcon icon={faCompactDisc} />
                      </button>
                    </td>
                  ) : null}

                  {route === 'admin/albums' ? (
                    <td>
                      <button
                        className="is-danger"
                        type="button"
                        onClick={() => handleOpenTrackModal(data)}
                        aria-label="add"
                      >
                        <FontAwesomeIcon icon={faMusic} />
                      </button>
                    </td>
                  ) : null}

                  <td>

                    <button
                      className="is-danger"
                      type="button"
                      onClick={() => handleOpenUpdateModal(data)}
                      aria-label="update"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleOpenDeleteModal(data)}
                      aria-label="delete"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isDeleteModalVisible
        && (
        <DeleteModal
          handleClose={handleCloseDeleteModal}
          handleConfirm={handleConfirmDelete}
          item={selectedItem}
          mode="delete"
        />
        )}
        {isAddModalVisible
        && (
        <AddModal
          handleClose={handleCloseAddModal}
          item={selectedItem}
        />
        )}
        {albumModalVisible
        && (
        <AlbumModal
          handleClose={handleCloseAlbumModal}
          item={selectedItem}
        />
        )}
        {trackModalVisible
        && (
        <TrackModal
          handleClose={handleCloseTrackModal}
          item={selectedItem}
        />
        )}
      </>
    );
  }
  return <p>Aucunes données.</p>;
}

export default AdminTable;
