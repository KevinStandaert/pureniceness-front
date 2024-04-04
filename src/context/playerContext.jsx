import { useState, createContext, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export const PlayerContext = createContext();

function PlayerProvider({ children }) {
  const [trackData, setTrackData] = useState(null);
  const [currentTracks, setCurrentTracks] = useState([]);
  const [trackName, setTrackName] = useState('');
  const [nextTrackIndex, setNextTrackIndex] = useState(0);
  const [nextTrackId, setNextTrackId] = useState(0);
  const [oneAlbumSongs, setOneAlbumSongs] = useState([]);
  const [likesDetails, setLikesDetails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setCurrentTracks(likesDetails); }, [likesDetails]);

  useEffect(
    () => { oneAlbumSongs.map((album) => setCurrentTracks(album.tracks)); },
    [oneAlbumSongs],
  );

  const handleClickPlay = async (track, index) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      let fetchSoundData;
      let nextIndex;

      if (index === undefined) {
        fetchSoundData = await fetch(`${apiUrl}/tracks/${nextTrackId}/audio`);
        nextIndex = (nextTrackIndex + 1) % currentTracks.length;
        setTrackName(currentTracks[nextTrackIndex].name);
      } else {
        fetchSoundData = await fetch(`${apiUrl}/tracks/${track.id}/audio`);
        nextIndex = (index + 1) % currentTracks.length;
        setTrackName(track.name);
      }

      if (!fetchSoundData.ok) {
        toast.error('Erreur lors du chargement de la musique');
        throw new Error('Erreur lors du chargement de la musique');
      }

      const audioBlob = await fetchSoundData.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setIsOpen(true);
      setTrackData(audioUrl);

      const nextId = currentTracks[nextIndex].id;
      setNextTrackId(nextId);
      setNextTrackIndex(nextIndex);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePlayer = () => {
    setIsOpen(false);
  };

  const playerValues = {
    handleClickPlay,
    oneAlbumSongs,
    setOneAlbumSongs,
    likesDetails,
    setLikesDetails,
  };

  return (
    <PlayerContext.Provider value={playerValues}>
      {children}
      {trackData && isOpen && (
      <div className="player-container">
        <AudioPlayer
          preload="metadata"
          src={trackData}
          className="audio-player"
          autoPlay
          onEnded={() => { handleClickPlay(nextTrackId); }}
        />

        <div className="close-player">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="icon-close-player"
            onClick={() => { handleClosePlayer(); }}
          />
        </div>

        {/* <div className="reduce-player">
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="icon-reduce-player"
            onClick={() => { handleClosePlayer(); }}
          />
        </div> */}

        <div className="audio-player__track-name">
          {trackName}
        </div>
      </div>
      )}

    </PlayerContext.Provider>
  );
}
export default PlayerProvider;
