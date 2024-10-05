import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';  // Importing Container for layout
import Register from './components/Register';
import Login from './components/Login';
import Notes from './components/Notes';
import Navbar from './components/Navbar';  // Update your Navbar component to use React-Bootstrap
import { AuthContext } from './context/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Container>  {/* Wrap routes in a container for consistent padding */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={user ? <Notes /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/notes" />} />
          </Routes>
        </Container>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
