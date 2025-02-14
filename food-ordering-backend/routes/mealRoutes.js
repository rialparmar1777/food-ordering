const express = require('express');
const Meal = require('../models/Meal');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all meals
router.get('/', async (req, res) => {
    try {
        const meals = await Meal.find();
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching meals' });
    }
});

// Create a new meal (protected route)
router.post('/', authMiddleware, async (req, res) => {
    const { name, description, imageUrl, price } = req.body;

    try {
        const newMeal = new Meal({ name, description, imageUrl, price });
        await newMeal.save();
        res.status(201).json({ message: 'Meal created successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error creating meal' });
    }
});

module.exports = router;
