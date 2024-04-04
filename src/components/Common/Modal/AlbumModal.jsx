/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import './modal.css';
import Sortable from 'sortablejs';
import { toast } from 'react-toastify';
import fetchData from '../../../services/api/call.api';
import Album from '../../../pages/Admin/Label/Album';

function AlbumModal({
  handleClose, item,
}) {
  const [allAlbums, setAllAlbums] = useState([]);
  const listRef = useRef(null);

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleDrop = async (dropIndex, dragIndex) => {
    const updatedAlbums = [...allAlbums];
    const draggedAlbum = updatedAlbums[dragIndex];
    updatedAlbums.splice(dragIndex, 1);
    updatedAlbums.splice(dropIndex, 0, draggedAlbum);
    setAllAlbums(updatedAlbums);
    const orders = updatedAlbums.map((album) => ({ id: album.id }));
    try {
      const token = localStorage.getItem('authApiToken');
      if (token) {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/admin/labels/${item.id}/albums/orders`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orders }),
        });
        const data = await response.json();
        toast.success(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLabelWithAlbums = async () => {
    const label = await fetchData('GET', `labels/${item.id}/albums`);
    setAllAlbums(label[0].albums);
  };

  useEffect(() => {
    fetchLabelWithAlbums();
  }, []);

  useEffect(() => {
    const sortableList = Sortable.create(listRef.current, {
      group: 'albums',
      animation: 150,
      onEnd(event) {
        handleDrop(event.newIndex, event.oldIndex);
      },
    });

    return () => {
      sortableList.destroy();
    };
  }, [allAlbums]);

  return (
    <div className="modal" aria-label="Add modal" onClick={handleModalClick}>
      <div className="modal-content modal-style-add modal-add">
        <button
          type="button"
          className="close close-modal-btn"
          aria-label="Close modal"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="modal__title">ALBUMS</h2>
        <div className="modal__body">
          <div className="albums-container">
            <div className="labels-albums-list" ref={listRef}>
              {allAlbums?.length && allAlbums.map((album, index) => (
                <Album
                  key={album.id}
                  index={index}
                  album={album}
                />
              ))}
            </div>
          </div>
          <div className="modal-submit-buttons">
            <button
              type="button"
              className="is-cancel close-modal-btn"
              onClick={handleClose}
              aria-label="Close modal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumModal;
