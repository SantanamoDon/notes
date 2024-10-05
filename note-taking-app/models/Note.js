
//Backend Note.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' } // For user association (later)
}, { timestamps: true }); 

module.exports = mongoose.model('Note', noteSchema); 