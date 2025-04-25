const express = require('express');
const router = express.Router();
const Movie = require('../Models/Movies');

// Create a movie
router.post('/', async (req, res) => {
  try {
    const { title, director, genre, releaseYear, availableCopies } = req.body;

    if (!title || !director || availableCopies == null) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const movie = new Movie({ title, director, genre, releaseYear, availableCopies });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(404).json({ error: 'Invalid movie ID' });
  }
});

// Update movie
router.put('/:id', async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Movie not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete movie
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
