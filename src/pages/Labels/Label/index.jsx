// Importing styles
import './index.css';

// Importing jwtDecode function 
import { jwtDecode } from 'jwt-decode';

// Importing hooks from React
import { useState, useEffect, useContext } from 'react';

// Importing local files
import fetchData from '../../../services/api/call.api'; 
import Album from './Album'; 
import { PlayerContext } from '../../../context/playerContext'; 

// Defining a functional component called Label which receives 'labelsWhithAlbums' as a prop
function Label({ labelsWhithAlbums }) {

// Defining state variables using the useContext hook to access values from PlayerContext
const { oneAlbumSongs, setOneAlbumSongs } = useContext(PlayerContext);

// Defining a state variable 'albumId' using the useState hook
const [albumId, setAlbumId] = useState(labelsWhithAlbums[0]?.albums[0]?.id);

// Declaring a variable 'userId'
let userId;
// Retrieving the token from localStorage
const token = localStorage.getItem('authApiToken');

if (token) {
  // Decoding the token
  const decodedToken = jwtDecode(token);
  userId = decodedToken.userId; // Get the userId from the token
}

// Function to fetch data for one album
const fetchAlbumData = async () => {
  // Adding a condition to check if the user is logged in or not
  if (userId) {
    // Fetching album data including liked tracks if user is logged in
    const fetchOneAlbumData = await fetchData('GET', `albums/${albumId}/tracks/likes`, null, true);
    setOneAlbumSongs(fetchOneAlbumData); // Setting fetched album data
  } else {
    // Fetching album data without liked tracks if user is unlogged
    const fetchOneAlbumData = await fetchData('GET', `albums/${albumId}/tracks`);
    setOneAlbumSongs(fetchOneAlbumData); // Setting fetched album data
  }
};
  
// Event handler for selecting an album
const handleClick = (id) => {
  setAlbumId(id);
};

// useEffect hook to trigger fetching album data when albumId changes
useEffect(() => {
  if (albumId !== null) {
    fetchAlbumData();
  }
}, [albumId]); //useEffect will re-run whenever albumId changes

// useEffect hook to set the initial albumId when labelsWhithAlbums changes
useEffect(() => {
  setAlbumId(labelsWhithAlbums[0]?.albums[0]?.id);
}, [labelsWhithAlbums]); //useEffect will re-run whenever labelsWhithAlbums changes

  // Rendering the component
  return (
    // Mapping over all albums of all labels
    labelsWhithAlbums?.map((label) => (
      <div key={label.id}>
        {/* Displaying the label name */}
        <div className="label-name hero">
          {label.name}
        </div>
        <div className="label-container">
          {/* Displaying albums for the label */}
          <div className="label-albums">
            {label.albums?.map((album) => (
              <div className="list__album-container" key={album.id}>
                <img
                  className="list__album-image"
                  src={album.url_image}
                  alt={`Selectionner l'album ${album.name}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleClick(album.id)}
                />
                {/* Displaying the album name */}
                <div className="list__album-name">{album.name}</div>
              </div>
            ))}
          </div>
          {/* Rendering the Album component with the selected album's songs */}
          <Album
            oneAlbumSongs={oneAlbumSongs}
            setOneAlbumSongs={setOneAlbumSongs}
          />
        </div>
      </div>
    ))
  );
}
// Exporting the Label component
export default Label;
