/* eslint-disable react/prop-types */
function EventsDetails({ eventsDetails }) {
  //   const [uneVariable, setUneVariable] = useState('');
  const events = eventsDetails.filter((event) => event.name);

  return (
    <>
      <h1 className="event_h1">
        Evénements
      </h1>

      {
            events.length
            ? (events.map((event, index) => (
              <div className={index % 2 === 0 ? 'event_container' : 'event_container is_active'} key={event.id}>
                <div className="img_container">
                  <img className="event_image" src={event.url_image} alt={event.name} />
                </div>
                <div className="text_containeur global_description">
                  <h2 className="event_h2">
                    {event.name}
                  </h2>
                  <p className="event_type global_description">
                    {event.type}
                  </p>
                  <p className="event_description global_description">
                    {event.description}
                  </p>
                  <p className="event_date_debut global_description">
                    Début:
                    {' '}
                    {new Date(event.starting_date).toLocaleString('fr-FR', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
                    })}

                  </p>
                  <p className="event_date_fin global_description">
                    Fin:
                    {' '}
                    {new Date(event.ending_date).toLocaleString('fr-FR', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
                    })}

                  </p>
                  <p className="event_ville global_description">
                    {event.city}
                  </p>
                  <p className="event_pays global_description">
                    {event.country}
                  </p>
                  <p className="event_lieu global_description">
                    {event.location}
                  </p>
                </div>
                
              </div>)
              ))
              : ('Aucun évènement à venir')
        }

    </>
  );
}

export default EventsDetails;
