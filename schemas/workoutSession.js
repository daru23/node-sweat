const mongoose = require('mongoose');

const workoutSessionSchema = new mongoose.Schema({
    userId: Number,
    date: Date,
    duration: Number,
    caloriesBurned: Number,
});

module.exports = mongoose.model('WorkoutSession', workoutSessionSchema);
