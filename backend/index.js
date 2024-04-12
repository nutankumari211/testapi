const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect('mongodb+srv://nutankumari211:nutan%40123%40@cluster0.pmxpstx.mongodb.net/neuron1?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
// enable cors
app.use(
  cors({
    origin:["https://testapi-frontend.vercel.app"],
    methods:["GET","PUT","POST"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(bodyParser.json());

// Routes
app.use('/api/data', dataRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
