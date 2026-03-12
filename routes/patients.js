const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// POST /patients - Register a new patient
router.post('/', async (req, res) => {
    try {
        const patientData = req.body;
        
        // Check if email already exists
        const existingPatient = await Patient.findOne({ email: patientData.email });
        if (existingPatient) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        const patient = new Patient(patientData);
        await patient.save();

        res.status(201).json({
            success: true,
            message: 'Patient registered successfully',
            data: patient
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate field value'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error registering patient',
            error: error.message
        });
    }
});

// GET /patients - Get all patient records
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find().sort({ admissionDate: -1 });
        
        res.status(200).json({
            success: true,
            message: 'Patients retrieved successfully',
            count: patients.length,
            data: patients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving patients',
            error: error.message
        });
    }
});

// GET /patients/:id - Get patient by ID
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Patient retrieved successfully',
            data: patient
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid patient ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error retrieving patient',
            error: error.message
        });
    }
});

// PUT /patients/:id - Update patient details
router.put('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        // Check if email is being updated and if it already exists
        if (req.body.email && req.body.email !== patient.email) {
            const existingPatient = await Patient.findOne({ email: req.body.email });
            if (existingPatient) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            }
        }

        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Patient updated successfully',
            data: updatedPatient
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid patient ID format'
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate field value'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating patient',
            error: error.message
        });
    }
});

// DELETE /patients/:id - Delete patient record
router.delete('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        await Patient.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Patient deleted successfully',
            data: patient
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid patient ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting patient',
            error: error.message
        });
    }
});

// GET /patients/search - Search patients by name or disease
router.get('/search', async (req, res) => {
    try {
        const { name, disease } = req.query;
        
        if (!name && !disease) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name or disease parameter for search'
            });
        }

        let searchQuery = {};
        
        if (name) {
            searchQuery.fullName = { $regex: name, $options: 'i' };
        }
        
        if (disease) {
            searchQuery.disease = { $regex: disease, $options: 'i' };
        }

        const patients = await Patient.find(searchQuery).sort({ admissionDate: -1 });

        res.status(200).json({
            success: true,
            message: 'Patients retrieved successfully',
            count: patients.length,
            data: patients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching patients',
            error: error.message
        });
    }
});

module.exports = router;
