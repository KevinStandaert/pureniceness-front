/* eslint-disable react/prop-types */

function Album({
  album,
}) {
  return (
    <div
      className="tracks-artist-card"
    >
      <img src={album.url_image} alt={album.name} />
      <h3>{album.name}</h3>
      <h4>{album.year}</h4>
    </div>
  );
}

export default Album;
