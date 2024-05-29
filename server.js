const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const articleRoutes = require('./src/route/articleRoutes');
require('dotenv').config();

const app = express();
const PORT = 8080;

// Connect to MongoD
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Use JSON middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Use article routes
app.use('/api', articleRoutes);

// Temporary route to generate tokens for testing
app.get('/generate-token', (req, res) => {
  const user = {
      id: 'user-id',
      roles: ['site'] 
  };

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
