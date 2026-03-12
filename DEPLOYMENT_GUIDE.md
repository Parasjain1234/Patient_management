# Deployment Guide

## GitHub Deployment Steps

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Enter repository name: `patient-management-system`
5. Add description: "A comprehensive patient management system API"
6. Choose Public or Private
7. Don't initialize with README (we already have one)
8. Click "Create repository"

### 2. Push to GitHub
```bash
# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/patient-management-system.git

# Push to GitHub
git push -u origin master
```

### 3. Repository URL
Your repository will be available at:
`https://github.com/yourusername/patient-management-system`

## Render Deployment Steps

### 1. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up using GitHub account
3. Verify your email

### 2. Create New Web Service
1. Click "New +" button in dashboard
2. Select "Web Service"
3. Connect your GitHub account
4. Select the `patient-management-system` repository
5. Configure the service:

**Service Configuration:**
- **Name**: `patient-management-api`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: `Free`

### 3. Environment Variables
Add the following environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Production environment |
| `PORT` | `10000` | Render's default port |
| `MONGODB_URI` | `your-mongodb-connection-string` | MongoDB connection string |

### 4. MongoDB Setup for Production

#### Option 1: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Whitelist your IP address (0.0.0.0/0 for Render)
6. Get connection string and add to environment variables

#### Option 2: Render MongoDB
1. In Render dashboard, click "New +"
2. Select "MongoDB"
3. Choose free plan
4. Create database
5. Copy connection string to environment variables

### 5. Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Wait for deployment to complete (usually 2-3 minutes)

### 6. Get Your API URL
Once deployed, your API will be available at:
`https://patient-management-api.onrender.com`

## Testing the Deployed API

### Update Postman Collection
1. Open the `POSTMAN_COLLECTION.json` file
2. Update the `baseUrl` variable to your Render URL:
   ```json
   {
       "key": "baseUrl",
       "value": "https://patient-management-api.onrender.com"
   }
   ```

### Test All Endpoints
1. Import the updated Postman collection
2. Test each endpoint to ensure they work correctly
3. Verify database operations are working

## Documentation for Submission

### Required Screenshots/Documents

1. **Code Output**
   - Terminal showing successful server startup
   - MongoDB connection confirmation

2. **Postman Requests**
   - Screenshots of all 6 API endpoints
   - Request and response for each endpoint

3. **MongoDB Storage**
   - MongoDB Atlas dashboard showing data
   - Sample patient records in the database

4. **Render Deployment**
   - Render dashboard showing successful deployment
   - Live API URL
   - Service logs showing no errors

### Sample Test Data

Use this sample data for testing:

```json
{
  "fullName": "Alice Johnson",
  "email": "alice.johnson@hospital.com",
  "phoneNumber": "+1987654321",
  "age": 28,
  "gender": "Female",
  "disease": "Diabetes Type 2",
  "doctorAssigned": "Dr. Sarah Williams",
  "roomNumber": "205B",
  "patientType": "Inpatient"
}
```

## Common Deployment Issues & Solutions

### Issue 1: MongoDB Connection Failed
**Solution**: 
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas
- Ensure username/password are correct

### Issue 2: Port Binding Error
**Solution**:
- Use environment variable `PORT=10000` for Render
- Don't hardcode port in server.js

### Issue 3: Build Timeout
**Solution**:
- Check package.json for correct scripts
- Ensure all dependencies are listed
- Verify no syntax errors in code

### Issue 4: 404 Errors
**Solution**:
- Check if routes are properly defined
- Verify Express middleware setup
- Ensure correct URL patterns

## Final Verification Checklist

- [ ] GitHub repository created and code pushed
- [ ] Render web service created
- [ ] Environment variables configured
- [ ] MongoDB database connected
- [ ] All API endpoints tested
- [ ] Error handling verified
- [ ] Documentation updated with live URLs
- [ ] Screenshots captured for submission

## Links for Documentation

**GitHub Repository**: `https://github.com/yourusername/patient-management-system`

**Live API**: `https://patient-management-api.onrender.com`

**API Documentation**: `https://patient-management-api.onrender.com/`

**MongoDB Atlas**: `https://cloud.mongodb.com/`

**Render Dashboard**: `https://dashboard.render.com/`
