require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes'); // User routes (login and register)
const mealRoutes = require('./routes/mealRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming requests with JSON payload

// Connect to Database
connectDB();

// Test Route
app.get('/api/test', (req, res) => {
    res.json({ message: "Backend is working!" });
});

// Routes
app.use('/api/users', userRoutes); // Handle user-related routes (login/register)
app.use('/api/meals', mealRoutes); // Handle meal-related routes
app.use('/api/payments', paymentRoutes); // Handle payment-related routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
