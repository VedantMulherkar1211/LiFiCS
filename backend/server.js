require('dotenv').config();  // Load environment variables
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());  // Enable CORS for frontend connection
app.use(express.json());  // Allow JSON data in requests

// Test API Route
app.get('/', (req, res) => {
    res.send('Backend is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
