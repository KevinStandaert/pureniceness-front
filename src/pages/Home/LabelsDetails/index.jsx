/* eslint-disable react/prop-types */

// functional component takes a prop labelsDetails
function LabelsDetails({ labelsDetails }) {
  // Filtering the labelsDetails array to get crews ('King Hi-Fi Sound System')
  const crews = labelsDetails.filter((label) => label.name === 'King Hi-Fi Sound System');

  // Filtering the labelsDetails array to get the other labels
  const labels = labelsDetails.filter((label) => label.name !== 'King Hi-Fi Sound System');

  return (
    <>
      {/* Mapping over the crews array and rendering crew details */}
      {crews.map((crew) => (
        <section className="hero" key={crew.id}>
          <img className="hero-image" src={crew.url_image} alt={crew.name} />
          <p className="title">
            {crew.name}
          </p>
          <p className="subtitle">
            {crew.description}
          </p>
        </section>
      ))}

      {/* Mapping over the labels array and rendering label details */}
      {labels.map((label, index) => (
        <div className={index % 2 === 0 ? 'label__card-main' : 'label__card-main is_reverse'} key={label.id}>
          <div className="label__card-header">
            <img className="label__card-image" src={label.url_image} alt={label.name} />
          </div>
          <div className="label__card-content">
            {label.description}
          </div>
        </div>
      ))}
    </>
  );
}

// Exporting the LabelsDetails component
export default LabelsDetails;
