// client/src/components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [individuals, setIndividuals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- NEW: State to track the IDs of selected individuals ---
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = 'supersecretadmintoken'; 
      const response = await axios.get('http://localhost:5000/api/individuals', {
        headers: { 'Authorization': token }
      });
      setIndividuals(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Function to handle selecting/deselecting an individual ---
  const handleSelect = (id) => {
    setSelectedIds(prevIds => {
      if (prevIds.includes(id)) {
        return prevIds.filter(prevId => prevId !== id); // Uncheck: remove ID
      } else {
        return [...prevIds, id]; // Check: add ID
      }
    });
  };

  // --- NEW: Function to handle the "Clear All" button ---
  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to delete ALL data? This action cannot be undone.')) {
      try {
        const token = 'supersecretadmintoken';
        await axios.delete('http://localhost:5000/api/individuals/all', {
          headers: { 'Authorization': token }
        });
        alert('All data has been cleared.');
        setIndividuals([]); // Clear the data in the UI instantly
        setSelectedIds([]); // Clear selections
      } catch (error) {
        alert('Failed to clear data.');
        console.error('Clear all error:', error);
      }
    }
  };

  // --- NEW: Function to handle the "Delete Selected" button ---
  const handleDeleteSelected = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected records?`)) {
      try {
        const token = 'supersecretadmintoken';
        await axios.delete('https://insight-hub-api.onrender.com/api/individuals', {
          headers: { 'Authorization': token },
          data: { ids: selectedIds } // Send the array of IDs in the request body
        });
        alert('Selected records have been deleted.');
        // Update the UI by filtering out the deleted records
        setIndividuals(prev => prev.filter(person => !selectedIds.includes(person._id)));
        setSelectedIds([]); // Clear selections
      } catch (error) {
        alert('Failed to delete selected records.');
        console.error('Delete selected error:', error);
      }
    }
  };


  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      
      {/* --- NEW: Action buttons area --- */}
      <div className="action-buttons">
        <button 
          onClick={handleDeleteSelected} 
          className="btn-delete"
          disabled={selectedIds.length === 0} // Disable if no items are selected
        >
          Delete Selected ({selectedIds.length})
        </button>
        <button 
          onClick={handleClearAll}
          className="btn-clear-all"
          disabled={individuals.length === 0} // Disable if there's no data
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
    </div>
  );
};

export default AdminDashboard;