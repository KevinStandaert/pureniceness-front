// Importing styles
import './index.css';

// Importing necessary React hooks
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

// Importing local files
import fetchData from '../../services/api/call.api';
import LabelsDetails from './LabelsDetails';

export const homeDataLoader = async () => {
  // Fetching labels data from the API
  const labelsData = await fetchData('GET', 'labels');
  // Setting the fetched data to the state
  return labelsData;
};

// Defining the Home component
function Home() {
  const data = useLoaderData();

  // Utilizing useState to store data
  const [labelsDetails, setLabelsDetails] = useState(data);

  // Rendering the component
  return (
    // Rendering the LabelsDetails component and passing labelsDetails as prop
    <LabelsDetails labelsDetails={labelsDetails} />

  );
}

// Exporting the Home component
export default Home;
