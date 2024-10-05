const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // For parsing application/json

// Your routes here
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/', (req,res) => {
  res.send('server is working')
})

// MongoDB connection
mongoose.connect("mongodb+srv://Donny:SantanDon@cluster0.z1dod.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(2000, () => {
    console.log('Server started on port 2000');
  });
})
.catch(err => console.error(err));
