/* eslint-disable react/prop-types */
import './index.css';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import { PlayerContext } from '../../../../context/playerContext';
import fetchData from '../../../../services/api/call.api';

function Album({ oneAlbumSongs, setOneAlbumSongs }) {
  const { handleClickPlay } = useContext(PlayerContext);

  const handleClickAddLikes = async (track) => {
    const likeWithSuccess = await fetchData('GET', `tracks/${track.id}/likes`, null, true);

    if (likeWithSuccess) {
      setOneAlbumSongs((prevData) => prevData?.map((album) => ({
        ...album,
        tracks: album.tracks?.map((item) => ({
          ...item,
          liked: item.id === track.id ? !track.liked : item.liked,
        })),
      })));
      if (!track.liked) {
        toast.success('Ajout aux favoris réussi.');
      } else {
        toast.success('Retrait aux favoris réussi.');
      }
    }
  };

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="album-container">
      <h1 className="album-container__title">
        {oneAlbumSongs[0]?.name}
      </h1>
      {oneAlbumSongs.length && oneAlbumSongs[0].tracks.length
        // true: map over the tracks array of the first album
        ? (
          oneAlbumSongs[0].tracks.map((track, index) => (
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
                {/* <div className="track-artist">
                  {track.artists?.map((artist) => artist.firstname).join(', ')}
                </div> */}
              </div>

              <div className="track-duration">
                {formatDuration(track.duration)}
              </div>
              <div className="track-fav">
                <FontAwesomeIcon
                  icon={track.liked ? solidStar : regularStar}
                  onClick={() => {
                    handleClickAddLikes(track);
                  }}
                  className="likes-icon"
                />
              </div>
            </div>
          ))
        )
        // false: tell this at the user.
        : (<span className="no-tracks">Aucun son dans cet album</span>)}
    </div>
  );
}
export default Album;
