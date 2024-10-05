# Note Taking App

This project is a full-stack note-taking application built with React for the frontend and Node.js for the backend. The app allows users to create an account, log in, and manage their notes. Users can create, edit, delete, and track their notes as either finished, pending, or completed.

# Backend Overview
The backend of this app is built using Node.js and Express. It provides routes for:

User Authentication: Register, login, and secure routes.
Note Management: Users can create, update, delete, and track the status of notes (pending, completed, finished).
Database: The app uses MongoDB to store user and note data.
The backend server listens on http://localhost:6000.

# Features
User Registration and Login: Users can create an account and log in to their personal dashboard.
Note Creation: Users can create new notes, which are saved to the database.
Track Notes: Users can view their notes and update their status as finished, pending, or completed.
Edit and Delete Notes: Users have the ability to edit or delete their notes.
Responsive Design: The frontend is fully responsive and optimized for various screen sizes.

## Available Scripts

In the project directory, you can run the following commands:

### `npm start`

Runs the frontend app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will automatically reload when changes are made to the source code.\
You may also see any linting errors in the console.

For the backend, you should also start the server by navigating to the backend directory and running:

```bash
cd backend
npm start


