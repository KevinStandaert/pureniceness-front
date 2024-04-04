/* eslint-disable react/no-unescaped-entities */
import './index.css';
import { useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import fetchData from '../../../services/api/call.api';
import { PlayerContext } from '../../../context/playerContext';

function Favorites({ userId }) {
  // adding the playerContext with Favorites
  const { handleClickPlay, likesDetails, setLikesDetails } = useContext(PlayerContext);

  // Fetch likes data from the API
  const fetchLikesData = async (id) => {
    const fetchedLikesData = await fetchData('GET', `users/${id}/likes`, null, true);
    if (fetchedLikesData) {
      setLikesDetails(fetchedLikesData);
    }
  };

  const deleteLike = async (id) => {
    const isDeleteLike = await fetchData('GET', `tracks/${id}/likes`, null, true);
    if (isDeleteLike) {
      const likesDetailsUpdated = likesDetails.filter((tracks) => {
        if (tracks.track_id !== id) {
          return tracks;
        }
        return null;
      });
      setLikesDetails(likesDetailsUpdated);
      toast.success('Favoris supprimé');
    } else {
      toast.error('Erreur lors de la suppression du favoris');
    }
  };

  useEffect(() => {
    fetchLikesData(userId);
  }, []);

  return (

    <div className="tracks-containeur__favorites">
      {likesDetails && likesDetails.map((track, index) => (
        <div className="tracks-list" key={track.name}>
          <div className="track-container" key={track.id}>
            <img className="track-cover-container" src={track.url_image} alt={track.name} />
            <div className="track-play">
              <FontAwesomeIcon
                icon={faPlay}
                className="play-icon"
                onClick={() => { handleClickPlay(track, index); }}
              />
            </div>

            <div className="track-infos">
              <div className="track-name">
                {track.name}
              </div>
              <div className="track-year">
                {track.year}
              </div>
              <FontAwesomeIcon className="trash-can" icon={faTrashCan} onClick={() => deleteLike(track.id)} />
            </div>

          </div>
        </div>
      ))}
    </div>

  );
}

export default Favorites;
