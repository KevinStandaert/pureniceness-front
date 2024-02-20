// Importing styles
import './index.css';

// Importing hooks from React
import { useState, useEffect } from 'react';

// Importing local files
import fetchData from '../../services/api/call.api';
import Album from './Album';

function Label({ labelsWhithAlbums }) {
  // Defining state variables
  const [oneAlbumSongs, setOneAlbumSongs] = useState([]);
  const [albumId, setAlbumId] = useState(1);

  // Event for selecting an album
  const handleClick = (key) => {
    setAlbumId(key);
  };

  // Function to fetch data for one album
  const fetchOneAlbumData = async () => {
    const oneAlbumData = await fetchData('GET', `albums/${albumId}/tracks`);
    setOneAlbumSongs(oneAlbumData);
  };

  // useEffect hook to trigger fetching album data when albumId changes
  useEffect(() => {
    if (albumId !== null) {
      fetchOneAlbumData();
    }
  }, [albumId]);

  // Rendering the component
  return (
    // Mapping over all albums of all labels
    labelsWhithAlbums?.map((label) => (
      <>
        {/* Displaying the label name */}
        <div className="label-name hero">
          {label.name}
        </div>
        <div className="label-container" key={label.id}>
          {/* Displaying albums for the label */}
          <div className="label-albums">
            {label.albums?.map((album) => (
              <div className="button-album-container" key={album.id}>
                {/* Button to select an album */}
                <button
                  className="button-album__image"
                  type="button"
                  style={{ backgroundImage: `url(${album.url_image})` }}
                  aria-label={album.name}
                  onClick={() => handleClick(album.id)}
                />
                {/* Displaying the album name */}
                <div className="button-album__name">{album.name}</div>
              </div>
            ))}
          </div>

          {/* Rendering the Album component with the selected album's songs */}
          <Album oneAlbumSongs={oneAlbumSongs} />
        </div>
      </>
    ))
  );
}

// Exporting the Label component
export default Label;
