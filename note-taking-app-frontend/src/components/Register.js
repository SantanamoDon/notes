import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous error messages

    try {
      const response = await axios.post('http://localhost:2000/api/users/register', {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('user', JSON.stringify({ token }));
      setUser({ token });
      navigate('/notes'); // Redirect to notes after registration
    } catch (error) {
      // Provide a user-friendly error message
      setErrorMessage(error.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Register</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
