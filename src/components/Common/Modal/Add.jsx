/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import './modal.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sortable from 'sortablejs';
import { toast } from 'react-toastify';
import fetchData from '../../../services/api/call.api';
import Input from '../Buttons/Input';
import { options } from '../../../data/formElement.json';
import Artist from '../../../pages/Admin/Track/Artist';

function AddModal({
  handleClose, item,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [allArtists, setAllArtists] = useState([]);
  const [artistsOfTrack, setArtistsOfTrack] = useState([]);
  const [optionsSelect, setOptionsSelect] = useState([]);
  const [formData, setFormData] = useState({});
  const [formInit, setFormInit] = useState(false);
  const listRef = useRef(null);

  const handleInputChange = (id, event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const initialForm = () => {
    const initialFormData = {};

    initialFormData.artist_id = optionsSelect.defaultValue || '';

    initialFormData.order = artistsOfTrack.length + 1;

    setFormData(initialFormData);
  };

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleShowForm = () => {
    initialForm();
    setFormVisible(true);
  };

  const handleHideForm = () => {
    setFormVisible(false);
  };

  const mooveArtistBack = (artistToDelete) => {
    const updatedArtistTrack = artistsOfTrack.filter((artist) => artist.id !== artistToDelete.id);
    optionsSelect.options.push({
      id: artistToDelete.id,
      name: `${artistToDelete.firstname} ${artistToDelete.lastname}`,
    });
    setOptionsSelect(optionsSelect);
    setArtistsOfTrack(updatedArtistTrack);
  };

  const handleDeleteArtist = async (artist) => {
    const artistDeleted = await fetchData('DELETE', `admin/tracks/${item.id}/artists/${artist.id}`, null, true);
    if (artistDeleted) {
      mooveArtistBack(artist);
      handleHideForm();
    }
  };

  const mooveArtist = (newArtist, artistTrack, artistNotTrack) => {
    const index = artistNotTrack
      .findIndex((artist) => artist.id === newArtist[0].artist_id);
    const indexOfAllArtist = allArtists
      .findIndex((artist) => artist.id === newArtist[0].artist_id);

    if (index !== -1 && indexOfAllArtist !== -1) {
      const artistMooved = artistNotTrack.splice(index, 1)[0];
      const artistInfos = allArtists.splice(indexOfAllArtist, 1)[0];
      artistInfos.role = newArtist[0].role;
      artistInfos.order = newArtist[0].order;
      setArtistsOfTrack([...artistTrack, artistInfos]);
      setOptionsSelect({
        ...optionsSelect,
        options: artistNotTrack,
        defaultValue: artistNotTrack[0]?.id,
      });
    } else {
      toast.error("Erreur lors de la mise à jour de l'affichage avec les nouvelles données.");
    }
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const formElement = event.target.closest('form');
    if (formElement && formElement.checkValidity()) {
      const artistAdded = await fetchData('POST', `admin/tracks/${item.id}/artists`, formData, true);
      if (artistAdded) {
        mooveArtist(artistAdded, artistsOfTrack, optionsSelect.options);
        toast.success('Artiste ajouté.');
        handleHideForm();
      }
    } else {
      toast.error('Certains champs du formulaire ne sont pas valides.');
    }
  };

  const getAllArtists = async () => {
    const artistsList = await fetchData('GET', 'admin/artists', null, true);
    return artistsList;
  };

  const getArtistsOfTrack = async () => {
    const artistsList = await fetchData('GET', `tracks/${item.id}/artists`);
    return artistsList[0].artists;
  };

  const handleDrop = async (dropIndex, dragIndex) => {
    const updatedArtists = [...artistsOfTrack];
    const draggedArtist = updatedArtists[dragIndex];
    updatedArtists.splice(dragIndex, 1);
    updatedArtists.splice(dropIndex, 0, draggedArtist);
    setArtistsOfTrack(updatedArtists);
    const orders = updatedArtists.map((artist) => ({ artistId: artist.id }));
    try {
      const token = localStorage.getItem('authApiToken');
      if (token) {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/admin/tracks/${item.id}/artists/orders`, {
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

  useEffect(() => {
    const fetchAllArtists = async () => {
      const artistsList = await getAllArtists();
      setAllArtists(artistsList);
      const artistsOfTrackList = await getArtistsOfTrack();
      setArtistsOfTrack(artistsOfTrackList);
      const uniqueArtists = artistsList
        .filter((artist) => !artistsOfTrackList.some((a) => a.id === artist.id));
      const optionsForSelect = uniqueArtists.map((artist) => ({
        id: artist.id,
        name: `${artist.firstname} ${artist.lastname}`,
      }));
      const optionsInSelect = {
        ...options.artist_id,
        options: optionsForSelect,
        defaultValue: optionsForSelect[0]?.id,
      };
      setOptionsSelect(optionsInSelect);
    };
    fetchAllArtists();
  }, []);

  useEffect(() => {
    const sortableList = Sortable.create(listRef.current, {
      group: 'artists',
      animation: 150,
      onEnd(event) {
        handleDrop(event.newIndex, event.oldIndex);
      },
    });

    return () => {
      sortableList.destroy();
    };
  }, [artistsOfTrack]);

  useEffect(() => {
    if (optionsSelect && !formInit) {
      initialForm();
      setFormInit(true);
    }
    if (optionsSelect && !formInit) {
      initialForm();
      setFormInit(true);
    }
  }, [optionsSelect, formInit]);

  return isVisible ? (
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
        <h2 className="modal__title">ARTISTES</h2>
        <div className="modal__body">
          <div className="artists-container">
            {formVisible ? null : (
              <button
                className="add-button"
                type="button"
                onClick={() => handleShowForm()}
                aria-label="add artist"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
            {formVisible
            && (
            <form className="add-artist-form">
              {optionsSelect && (
                <>
                  <Input
                    key={options.artist_id.id}
                    options={optionsSelect}
                    handleInputChange={handleInputChange}
                  />
                  <Input
                    key={options.role.id}
                    options={options.role}
                    handleInputChange={handleInputChange}
                  />
                </>
              )}
              <div className="modal-submit-buttons">
                <button
                  type="button"
                  className="close-artist-form"
                  onClick={handleHideForm}
                  aria-label="Close modal"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="submit-artist-form"
                  onClick={(handleSubmitForm)}
                  aria-label="Valid form"
                >
                  Ajouter
                </button>
              </div>
            </form>
            )}
            <div className="tracks-artists-list" ref={listRef}>
              {artistsOfTrack?.length && artistsOfTrack.map((artist, index) => (
                <Artist
                  key={artist.id}
                  index={index}
                  artist={artist}
                  handleDeleteArtist={handleDeleteArtist}
                  handleDrop={handleDrop}
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
  ) : null;
}

export default AddModal;
