// client/src/components/DataTableView.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTableView = () => {
  const [individuals, setIndividuals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = 'supersecretadmintoken'; 
      const response = await axios.get('https://insight-hub-api.onrender.com/api/individuals', {
        headers: { 'Authorization': token }
      });
      setIndividuals(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds(prevIds => {
      if (prevIds.includes(id)) {
        return prevIds.filter(prevId => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to delete ALL data? This action cannot be undone.')) {
      try {
        const token = 'supersecretadmintoken';
        await axios.delete('https://insight-hub-api.onrender.com/api/individuals/all', {
          headers: { 'Authorization': token }
        });
        alert('All data has been cleared.');
        setIndividuals([]);
        setSelectedIds([]);
      } catch (error) {
        alert('Failed to clear data.');
        console.error('Clear all error:', error);
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected records?`)) {
      try {
        const token = 'supersecretadmintoken';
        await axios.delete('https://insight-hub-api.onrender.com/api/individuals', {
          headers: { 'Authorization': token },
          data: { ids: selectedIds }
        });
        alert('Selected records have been deleted.');
        setIndividuals(prev => prev.filter(person => !selectedIds.includes(person._id)));
        setSelectedIds([]);
      } catch (error) {
        alert('Failed to delete selected records.');
        console.error('Delete selected error:', error);
      }
    }
  };

  if (loading) return <div>Loading All Data...</div>;

  return (
    <>
      <div className="action-buttons">
        <button 
          onClick={handleDeleteSelected} 
          className="btn-delete"
          disabled={selectedIds.length === 0}
        >
          Delete Selected ({selectedIds.length})
        </button>
        <button 
          onClick={handleClearAll}
          className="btn-clear-all"
          disabled={individuals.length === 0}
        >
          Clear All Data
        </button>
      </div>
      <h2>All Submissions ({individuals.length})</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>{/* Checkbox column */}</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {individuals.map(person => (
            <tr key={person._id}>
              <td>
                <input 
                  type="checkbox"
                  checked={selectedIds.includes(person._id)}
                  onChange={() => handleSelect(person._id)}
                />
              </td>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.phone}</td>
              <td>{new Date(person.submittedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {individuals.length === 0 && <p style={{textAlign: 'center', marginTop: '2rem'}}>No data available.</p>}
    </>
  );
};

export default DataTableView;