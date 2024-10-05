import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/Notes.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetching Notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/notes', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setNotes(response.data);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to load notes');
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [user]);

  // Creating Notes
  const handleCreateNote = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!newNoteTitle || !newNoteContent) {
      setErrorMessage("Title and content cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:2000/api/notes/create',
        { title: newNoteTitle, content: newNoteContent },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setNotes([...notes, response.data]);
      setNewNoteTitle('');
      setNewNoteContent('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to create note');
    }
  };

  // Updating Notes
  const handleUpdateNote = async (noteId) => {
    const updatedTitle = prompt(
      'Enter new title:',
      notes.find((note) => note._id === noteId).title
    );
    const updatedContent = prompt(
      'Enter new content:',
      notes.find((note) => note._id === noteId).content
    );

    if (updatedTitle && updatedContent) {
      try {
        const response = await axios.put(
          `http://localhost:2000/api/notes/${noteId}`,
          { title: updatedTitle, content: updatedContent },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        const updatedNotes = notes.map((note) =>
          note._id === noteId ? response.data : note
        );
        setNotes(updatedNotes);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to update note');
      }
    }
  };

  // Deleting Notes
  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`http://localhost:2000/api/notes/${noteId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const filteredNotes = notes.filter((note) => note._id !== noteId);
        setNotes(filteredNotes);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to delete note');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Your Notes</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Create Note Form */}
      <form onSubmit={handleCreateNote}>
        <div className="mb-3">
          <label htmlFor="newNoteTitle" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="newNoteTitle"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newNoteContent" className="form-label">
            Content:
          </label>
          <textarea
            className="form-control"
            id="newNoteContent"
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>

      {/* Notes List */}
      <ul className="list-group mt-4">
        {notes.map((note) => (
          <li key={note._id} className="list-group-item">
            <h5 className="mb-2">{note.title}</h5>
            <p className="mb-2">{note.content}</p>
            <button
              className="btn btn-warning me-2"
              onClick={() => handleUpdateNote(note._id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteNote(note._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
