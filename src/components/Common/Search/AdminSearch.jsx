/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import styles from './AdminSearch.module.css';

function AdminSearch({ datas, onSearch }) {
  const [searchColumn, setSearchColumn] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [firstRender, setFirstRender] = useState(true);

  const handleSearchColumn = (selectedColumn) => {
    setSearchColumn(selectedColumn);
  };

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(searchColumn, newSearchTerm);
  };

  useEffect(() => {
    if (!firstRender) {
      onSearch(searchColumn, searchTerm);
    } else {
      setFirstRender(false);
    }
  }, [searchColumn]);

  return (
    <section className={styles.section}>
      <div>
        <span>Recherche</span>
        <select onChange={(e) => handleSearchColumn(e.target.value)}>
          {datas.length > 0
      && Object.keys(datas[0]).map((columnName) => (
        <option key={columnName} value={columnName}>
          {columnName}
        </option>
      ))}
        </select>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Rechercher..."
          onChange={handleSearch}
        />
      </div>
    </section>
  );
}

export default AdminSearch;
