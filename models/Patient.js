const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Full name must be at least 2 characters long'],
        maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age must be a positive number'],
        max: [150, 'Age cannot exceed 150']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female', 'Other'],
        trim: true
    },
    disease: {
        type: String,
        required: [true, 'Disease/Diagnosis is required'],
        trim: true,
        maxlength: [200, 'Disease description cannot exceed 200 characters']
    },
    doctorAssigned: {
        type: String,
        required: [true, 'Doctor assigned is required'],
        trim: true,
        maxlength: [100, 'Doctor name cannot exceed 100 characters']
    },
    admissionDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    roomNumber: {
        type: String,
        required: false,
        trim: true,
        maxlength: [20, 'Room number cannot exceed 20 characters']
    },
    patientType: {
        type: String,
        required: [true, 'Patient type is required'],
        enum: ['Inpatient', 'Outpatient'],
        default: 'Inpatient'
    },
    status: {
        type: String,
        required: true,
        enum: ['Admitted', 'Discharged'],
        default: 'Admitted'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for patient ID
patientSchema.virtual('patientId').get(function() {
    return this._id.toString();
});

// Index for search functionality
patientSchema.index({ fullName: 'text', disease: 'text' });

// Pre-save middleware to format phone number
patientSchema.pre('save', function(next) {
    if (this.phoneNumber) {
        // Remove any non-digit characters except +
        this.phoneNumber = this.phoneNumber.replace(/[^\d+]/g, '');
    }
    next();
});

// Static method to search patients
patientSchema.statics.searchPatients = function(query) {
    return this.find({
        $or: [
            { fullName: { $regex: query, $options: 'i' } },
            { disease: { $regex: query, $options: 'i' } }
        ]
    });
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
