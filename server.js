const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const patientRoutes = require('./routes/patients');

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB successfully');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

// Routes
app.use('/patients', patientRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Patient Management System API',
        version: '1.0.0',
        endpoints: {
            'GET /patients': 'Get all patient records',
            'POST /patients': 'Register a new patient',
            'GET /patients/:id': 'Get patient by ID',
            'PUT /patients/:id': 'Update patient details',
            'DELETE /patients/:id': 'Delete patient record',
            'GET /patients/search?name=xyz': 'Search patient by name'
        }
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
