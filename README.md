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
- [Contributing](#contributing)

## ✨ Features

### Core Features
- 🔍 **Flight Search** - Search flights by origin, destination, and date
- 🎫 **Flight Booking** - Complete booking process with passenger information
- 🪑 **Seat Selection** - Interactive seat map with real-time availability
- 📧 **Email Notifications** - Automated e-ticket delivery via email
- 📱 **Responsive Design** - Mobile-friendly interface
- 🖨️ **Ticket Printing** - Print boarding passes directly from browser

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
git clone https://github.com/yourusername/flyticket.git
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
Email: admin@flightbooking.com
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

### Test User Accounts
```
Regular User:
Email: user@example.com
Password: user123

Test User 2:
Email: john.doe@email.com
Password: password123
```

### Database Direct Access
```bash
# MongoDB local connection
mongo mongodb://localhost:27017/flyticket

# View collections
show collections
db.flights.find()
db.tickets.find()
db.cities.find()

# Check flight conflicts
db.flights.find({
  "from_city": ObjectId("..."),
  "departure_time": {
    $gte: ISODate("2025-05-28T10:00:00Z"),
    $lt: ISODate("2025-05-28T11:00:00Z")
  }
})
```

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
![Flight Search](./screenshots/flight-search.png)

### Seat Selection
![Seat Selection](./screenshots/seat-selection.png)

### Booking Confirmation
![Booking Confirmation](./screenshots/booking-confirmation.png)

### Email Ticket
![Email Ticket](./screenshots/email-ticket.png)

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

### Manual Testing Checklist

#### User Features
- [ ] Search flights by route and date
- [ ] Select seats on flight booking
- [ ] Complete booking process
- [ ] Receive email confirmation
- [ ] Print ticket functionality
- [ ] Mobile responsiveness
- [ ] Error handling

#### Admin Features
- [ ] Admin login/logout functionality
- [ ] Create new flights with validation
- [ ] Update existing flight details
- [ ] Delete flights (with booking checks)
- [ ] Add new cities/destinations
- [ ] View all bookings and statistics
- [ ] Flight conflict prevention
- [ ] Duplicate flight detection

#### Business Rules Testing
- [ ] Cannot create overlapping flights from same city
- [ ] Flight duration validation (realistic times)
- [ ] Seat capacity cannot exceed aircraft limits
- [ ] Cannot delete flights with existing bookings
- [ ] Past flights cannot be modified
- [ ] Arrival time must be after departure time

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy dist folder
```

### Backend (Heroku/Railway)
```bash
# Add production environment variables
# Deploy backend with database connection
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
```

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check if MongoDB is running
brew services start mongodb-community
# or
sudo service mongod start
```

**Port Already in Use**
```bash
# Kill process on port 3000 or 4000
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

**Email Not Sending**
- Verify Gmail App Password is correct
- Check 2-Step Verification is enabled
- Ensure no spaces in app password

**Seat Selection Not Working**
- Check if flight has seats_available field
- Verify seat_number is included in ticket model

**Admin Login Issues**
- Verify admin credentials in database
- Check JWT token configuration
- Ensure admin middleware is properly implemented

**Flight Creation Conflicts**
- Check duplicate flight validation
- Verify departure/arrival time logic
- Ensure city relationships are properly set

**Business Rule Violations**
```javascript
// Example conflict check
const existingFlight = await Flight.findOne({
  from_city: flight.from_city,
  departure_time: {
    $gte: new Date(flight.departure_time - 60*60*1000), // 1 hour before
    $lte: new Date(flight.departure_time + 60*60*1000)  // 1 hour after
  }
});
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React.js team for the amazing framework
- MongoDB team for the database solution
- Bootstrap team for the UI components
- Nodemailer for email functionality

---

## 📞 Support

For support, email support@flightbooking.com or create an issue in the GitHub repository.

## 🔄 Version History

- **v1.0.0** - Initial release with core booking functionality
- **v1.1.0** - Added seat selection feature
- **v1.2.0** - Implemented email notifications
- **v1.3.0** - Enhanced responsive design
- **v1.4.0** - Added admin panel with flight management
- **v1.5.0** - Implemented business rules and conflict prevention
- **v1.6.0** - Enhanced validation and error handling

---

**Happy Flying! ✈️**