// controllers/noteController.js
const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); // Fetch notes associated with the user
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNote = async (req, res) => {
    const { title, content } = req.body;
    const note = new Note({
        title,
        content,
        user: req.user.id, // Save the user ID
    });

    try {
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
