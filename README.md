# ✈️ FlyTicket

A full-stack web application for booking flights with modern features including seat selection and email notifications.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Admin Credentials](#admin-credentials)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)

## ✨ Features

### Core Features
- 🔍 **Flight Search** - Search flights by origin, destination, and date
- 🎫 **Flight Booking** - Complete booking process with passenger information
- 📧 **Email Notifications** - Automated e-ticket delivery via email

### Admin Features
- ✈️ **Flight Management** - Create, update, and delete flights
- 🏙️ **City Management** - Add new destinations and origins
- 📊 **Booking Overview** - View all bookings and passenger details
- ⚠️ **Conflict Prevention** - Automatic validation to prevent duplicate flights
- 🛡️ **Business Rules** - Enforce flight scheduling constraints
  - No two flights can depart from the same city at the same time
  - No aircraft can be in two places simultaneously
  - Automatic seat availability management

### Advanced Features
- ⚡ **Real-time Seat Updates** - Dynamic seat availability
- 🎨 **Modern UI/UX** - Clean and intuitive design
- 📊 **Booking Confirmation** - Detailed booking summary with QR code placeholder
- 🔒 **Data Validation** - Comprehensive form validation
- 📈 **Error Handling** - Graceful error management

## 🛠️ Technologies Used

### Frontend
- **React.js** `^18.2.0` - UI Library
- **React Router DOM** `^6.8.0` - Client-side routing
- **React Bootstrap** `^2.7.0` - UI Components
- **Bootstrap** `^5.2.0` - CSS Framework
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** `^18.0.0` - Runtime environment
- **Express.js** `^4.18.0` - Web framework
- **MongoDB** `^6.0.0` - NoSQL database
- **Mongoose** `^7.0.0` - MongoDB object modeling
- **Nodemailer** `^6.9.0` - Email sending service
- **dotenv** `^16.0.0` - Environment variable management
- **cors** `^2.8.5` - Cross-origin resource sharing
- **bcryptjs** `^2.4.3` - Password hashing (if auth implemented)

### Development Tools
- **Nodemon** `^2.0.20` - Development server auto-restart
- **Concurrently** `^7.6.0` - Run multiple commands
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** (comes with Node.js)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/beyzaevcen/flyticket.git
cd flyticket
```

### 2. API (Backend) Setup
```bash
# Navigate to api directory
cd api

# Install dependencies
npm install

# Create environment file
touch .env
```

### 3. Configure Environment Variables
Create a `.env` file in the api directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/flyticket
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flyticket

# Email Configuration (for e-ticket sending)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password

# JWT Configuration (if auth implemented)
JWT_SECRET=your-super-secret-jwt-key
```

### 4. Client (Frontend) Setup
```bash
# Navigate to client directory (open new terminal)
cd client

# Install dependencies
npm install

# Create environment file
touch .env
```

Add to client `.env`:
```env
REACT_APP_API_URL=http://localhost:4000/api
```

### 5. Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod

# Create database and collections (optional - will be created automatically)
mongo
use flight_booking
```

#### Option B: MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and add to `.env`

### 6. Seed Sample Data (Optional)
```bash
# In api directory
npm run seed
```

## 🏃‍♂️ Running the Project

### Development Mode

#### Method 1: Run Both Servers Simultaneously
```bash
# From root directory
npm run dev
```

#### Method 2: Run Servers Separately
```bash
# Terminal 1 - API (Backend)
cd api
npm start
# or for development with auto-restart:
npm run dev

# Terminal 2 - Client (Frontend)
cd client
npm start
```

### Production Mode
```bash
# Build client
cd client
npm run build

# Serve both from api
cd ../api
npm run production
```

### 📱 Access the Application

- **Client (Frontend):** http://localhost:3000
- **API (Backend):** http://localhost:4000
- **API Documentation:** http://localhost:4000/api/docs (if implemented)

## 👤 Admin Credentials

### Admin Panel Access
```
User: admin
Password: admin123
```

### Admin Capabilities
- **Flight Management:**
  - Create new flights with validation
  - Update existing flight details
  - Delete flights (if no bookings exist)
  - View flight statistics and occupancy

- **Business Rules Enforcement:**
  - Prevent overlapping flights from same origin
  - Validate aircraft scheduling conflicts  
  - Ensure realistic flight durations
  - Automatic seat capacity management

- **City & Route Management:**
  - Add new destinations
  - Update city information
  - Manage airport codes


## 🔗 API Endpoints

### Flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/:id` - Get flight by ID
- `POST /api/flights/search` - Search flights
- `POST /api/flights` - Create new flight (admin) *
- `PUT /api/flights/:id` - Update flight (admin) *
- `DELETE /api/flights/:id` - Delete flight (admin) *
- `POST /api/flights/validate` - Validate flight conflicts (admin)

### Cities
- `GET /api/cities` - Get all cities
- `POST /api/cities` - Create new city (admin) *
- `PUT /api/cities/:id` - Update city (admin) *
- `DELETE /api/cities/:id` - Delete city (admin) *

### Tickets
- `POST /api/tickets` - Book a ticket
- `GET /api/tickets/:id` - Get ticket details
- `GET /api/tickets` - Get all tickets (admin) *

### Email
- `POST /api/email/send-ticket/:ticketId` - Send e-ticket via email

### Admin Authentication
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/admin/logout` - Admin logout
- `GET /api/auth/admin/verify` - Verify admin token

*Requires admin authentication

## 📁 Project Structure

```
flyticket/
├── api/
│   ├── controllers/
│   │   ├── flightController.js
│   │   ├── ticketController.js
│   │   ├── cityController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── Flight.js
│   │   ├── Ticket.js
│   │   ├── City.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── flightRoutes.js
│   │   ├── ticketRoutes.js
│   │   ├── cityRoutes.js
│   │   ├── emailRoutes.js
│   │   └── adminRoutes.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── validationService.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── config/
│   │   └── database.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── client/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Header.js
    │   │   ├── FlightCard.js
    │   │   ├── SeatSelection.js
    │   │   ├── Message.js
    │   │   └── Loader.js
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── FlightDetailPage.js
    │   │   ├── BookingConfirmationPage.js
    │   │   ├── AdminLoginPage.js
    │   │   ├── AdminDashboard.js
    │   │   └── AdminFlightManagement.js
    │   ├── services/
    │   │   ├── flightService.js
    │   │   ├── ticketService.js
    │   │   └── emailService.js
    │   ├── App.js
    │   └── index.js
    ├── .env
    └── package.json
```

## 📸 Screenshots

### Home Page - Flight Search
![Flight Search](./screenshots/a.png)

### Booking Confirmation
![Booking Confirmation](./screenshots/b.png)

### Admin Dashboard 
![Admin Dashboard](./screenshots/c.png)

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 👥 Authors

- **Beyza Evcen** - [beyzaevcen](https://github.com/beyzaevcen)


**Happy Flying! ✈️**