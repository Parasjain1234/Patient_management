# Patient Management System API

A comprehensive web-based patient management system backend API built with Node.js, Express, and MongoDB.

## Features

- **Patient Registration**: Register new patients with comprehensive details
- **View Records**: Retrieve all patient records or specific patients by ID
- **Update Information**: Update patient details
- **Delete Records**: Remove patient records from the system
- **Search Functionality**: Search patients by name or disease
- **Data Validation**: Comprehensive input validation and error handling
- **RESTful API**: Clean and intuitive REST API design

## Patient Data Fields

Each patient record contains the following information:

- **Patient ID** (Auto-generated unique identifier)
- **Full Name** (Required)
- **Email** (Required, Unique)
- **Phone Number** (Required)
- **Age** (Required, Positive number)
- **Gender** (Required: Male/Female/Other)
- **Disease/Diagnosis** (Required)
- **Doctor Assigned** (Required)
- **Admission Date** (Auto-generated)
- **Room Number** (Optional)
- **Patient Type** (Required: Inpatient/Outpatient)
- **Status** (Required: Admitted/Discharged, Default: Admitted)

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment Management**: dotenv
- **Validation**: Mongoose built-in validators
- **Error Handling**: Comprehensive middleware

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running)
- npm or yarn

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd patient-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/patient_management
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Ensure MongoDB is running on your system:
   ```bash
   # For Windows
   net start MongoDB

   # For macOS/Linux
   sudo systemctl start mongod
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Patient Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/patients` | Register a new patient |
| GET | `/patients` | Get all patient records |
| GET | `/patients/:id` | Get patient by ID |
| PUT | `/patients/:id` | Update patient details |
| DELETE | `/patients/:id` | Delete patient record |
| GET | `/patients/search` | Search patients by name or disease |

### API Usage Examples

#### 1. Register a New Patient
```http
POST /patients
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "age": 35,
  "gender": "Male",
  "disease": "Hypertension",
  "doctorAssigned": "Dr. Smith",
  "roomNumber": "101A",
  "patientType": "Inpatient"
}
```

#### 2. Get All Patients
```http
GET /patients
```

#### 3. Get Patient by ID
```http
GET /patients/60d5ecb74b24a1234567890
```

#### 4. Update Patient Details
```http
PUT /patients/60d5ecb74b24a1234567890
Content-Type: application/json

{
  "age": 36,
  "status": "Discharged"
}
```

#### 5. Delete Patient Record
```http
DELETE /patients/60d5ecb74b24a1234567890
```

#### 6. Search Patients
```http
# Search by name
GET /patients/search?name=John

# Search by disease
GET /patients/search?disease=Hypertension

# Search by both
GET /patients/search?name=John&disease=Hypertension
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Patient data or array of patients
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if any)
  ]
}
```

## HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## Data Validation

The API includes comprehensive validation for all patient fields:

- **Email**: Valid email format, unique across all patients
- **Phone Number**: Valid international phone format
- **Age**: Positive number between 0-150
- **Gender**: Must be Male, Female, or Other
- **Patient Type**: Must be Inpatient or Outpatient
- **Status**: Must be Admitted or Discharged

## Error Handling

The application includes robust error handling:

- **Validation Errors**: Detailed error messages for invalid input
- **Duplicate Detection**: Prevents duplicate email addresses
- **Database Errors**: Graceful handling of database connection issues
- **404 Errors**: Clear messages when resources are not found

## Project Structure

```
patient-management-system/
├── models/
│   └── Patient.js          # Patient schema and model
├── routes/
│   └── patients.js         # Patient API routes
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
├── server.js               # Main server file
└── README.md               # This file
```

## Deployment

### GitHub Deployment

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### Render Deployment

1. **Create Render Account**
   - Sign up at [render.com](https://render.com)

2. **Connect GitHub Repository**
   - Link your GitHub repository to Render
   - Select "Web Service" as the service type

3. **Configure Environment Variables**
   - Set `MONGODB_URI` to your MongoDB connection string
   - Set `NODE_ENV` to `production`
   - Set `PORT` to `10000` (Render's default)

4. **Deploy**
   - Render will automatically deploy your application
   - Your API will be available at the provided Render URL

## Testing with Postman

### Import Postman Collection

You can test all endpoints using Postman. Here are the request examples:

1. **Register Patient**
   - Method: POST
   - URL: `{{baseUrl}}/patients`
   - Body: JSON with patient details

2. **Get All Patients**
   - Method: GET
   - URL: `{{baseUrl}}/patients`

3. **Get Patient by ID**
   - Method: GET
   - URL: `{{baseUrl}}/patients/{{patientId}}`

4. **Update Patient**
   - Method: PUT
   - URL: `{{baseUrl}}/patients/{{patientId}}`
   - Body: JSON with updated fields

5. **Delete Patient**
   - Method: DELETE
   - URL: `{{baseUrl}}/patients/{{patientId}}`

6. **Search Patients**
   - Method: GET
   - URL: `{{baseUrl}}/patients/search?name={{searchTerm}}`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For any issues or questions, please create an issue in the GitHub repository.
