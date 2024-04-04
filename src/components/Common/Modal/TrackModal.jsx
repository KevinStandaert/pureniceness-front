/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import './modal.css';
import Sortable from 'sortablejs';
import { toast } from 'react-toastify';
import fetchData from '../../../services/api/call.api';
import Track from '../../../pages/Admin/Album/Track';

function TrackModal({
  handleClose, item,
}) {
  const [allTracks, setAllTracks] = useState([]);
  const listRef = useRef(null);

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleDrop = async (dropIndex, dragIndex) => {
    const updatedTracks = [...allTracks];
    const draggedTrack = updatedTracks[dragIndex];
    updatedTracks.splice(dragIndex, 1);
    updatedTracks.splice(dropIndex, 0, draggedTrack);
    setAllTracks(updatedTracks);
    const orders = updatedTracks.map((track) => ({ id: track.id }));
    try {
      const token = localStorage.getItem('authApiToken');
      if (token) {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/admin/albums/${item.id}/tracks/orders`, {
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

  const fetchLabelWithTracks = async () => {
    const album = await fetchData('GET', `albums/${item.id}/tracks`);
    setAllTracks(album[0].tracks);
  };

  useEffect(() => {
    fetchLabelWithTracks();
  }, []);

  useEffect(() => {
    const sortableList = Sortable.create(listRef.current, {
      group: 'tracks',
      animation: 150,
      handle: '.albums-track-card span, .albums-track-card img',
      onEnd(event) {
        handleDrop(event.newIndex, event.oldIndex);
      },
    });

    return () => {
      sortableList.destroy();
    };
  }, [allTracks]);

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
        <h2 className="modal__title">SONS</h2>
        <div className="modal__body">
          <div className="tracks-container">
            <div className="albums-tracks-list" ref={listRef}>
              {allTracks?.length && allTracks.map((track, index) => (
                <Track
                  key={track.id}
                  index={index}
                  track={track}
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

export default TrackModal;
