import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import fetchData from '../../../../services/api/call.api';
import Dropdown from '../../../Common/Dropdown';

function DropdownLabel() {
  const [labels, setLabels] = useState([]);
  const fetchLabels = async () => {
    const labelsData = await fetchData('GET', 'labels');
    const labelLinks = [];
    labelsData.map((label) => {
      if (label.name !== 'King Hi-Fi Sound System') {
        labelLinks.push({ id: label.id, path: `/labels/${label.id}`, label: label.name })
      }
    });
    setLabels(labelLinks);
  };

  useEffect(() => {
    fetchLabels();
  }, []);

  return (
    <Dropdown title="Musiques" icon={faMusic} links={labels} />
  );
}

export default DropdownLabel;
