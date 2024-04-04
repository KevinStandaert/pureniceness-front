/* eslint-disable react/prop-types */

function Track({
  track, index,
}) {
  return (
    <div
      className="albums-track-card"
    >
      <span>{index + 1}</span>
      <img src={track.url_image} alt={track.name} />
      <h3>{track.name}</h3>
    </div>
  );
}

export default Track;
