/* eslint-disable react/prop-types */

function Artist({
  artist, handleDeleteArtist,
}) {
  return (
    <div
      className="tracks-artist-card"
    >
      <button
        type="button"
        className="close close-modal-btn"
        aria-label="Close modal"
        onClick={() => handleDeleteArtist(artist)}
      >
        &times;
      </button>
      <img src={artist.url_image} alt={`${artist.firstname} ${artist.lastname}`} />
      <h3>{`${artist.firstname} ${artist.lastname}`}</h3>
      <h4>{`${artist.role}`}</h4>
    </div>
  );
}

export default Artist;
