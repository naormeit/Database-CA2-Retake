const mongoose = require('mongoose');

const newMovies = new mogoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number
    },
    availableCopies: {
        type: Number,
        required: true
    }
});

exports.console.log(newMovies);