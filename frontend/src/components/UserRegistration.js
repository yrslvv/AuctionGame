import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserRegistration.css';

const UserRegistration = ({ setUsername }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(2); // Default duration to 2 minutes
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername(name);
    try {
      const response = await axios.get('http://localhost:5000/api/auction');
      if (response.data) {
        navigate('/auction');
      } else {
        await axios.post('http://localhost:5000/api/auction', { duration });
        navigate('/auction');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAuction = async () => {
    try {
      await axios.delete('http://localhost:5000/api/auction');
      alert('Current auction deleted');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="registration-container">
      <h1>Enter the Auction</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (minutes)"
          required
        />
        <button type="submit">Join Auction</button>
      </form>
      <button onClick={handleDeleteAuction} className="delete-button">Delete Current Auction</button>
    </div>
  );
};

export default UserRegistration;
