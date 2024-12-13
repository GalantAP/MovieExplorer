const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy data
let movies = [
    { id: 1, title: "Inception", year: 2010 },
    { id: 2, title: "Interstellar", year: 2014 },
    { id: 3, title: "The Dark Knight", year: 2008 },
];

let nextId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;

// Routes
// Read all movies
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// Read a single movie by ID
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find((m) => m.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
});

// Create a new movie
app.post('/api/movies', (req, res) => {
    const { title, year } = req.body;

    // Validate input
    if (!title || !year) {
        return res.status(400).json({ error: "Title and year are required" });
    }

    const newMovie = { id: nextId++, title, year };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// Update an existing movie
app.put('/api/movies/:id', (req, res) => {
    const { id } = req.params;
    const { title, year } = req.body;

    // Validate input
    if (!title || !year) {
        return res.status(400).json({ error: "Title and year are required" });
    }

    const movieIndex = movies.findIndex((m) => m.id === parseInt(id));
    if (movieIndex === -1) {
        return res.status(404).json({ error: "Movie not found" });
    }

    // Update the movie
    movies[movieIndex] = { id: parseInt(id), title, year };
    res.json(movies[movieIndex]);
});

// Delete a movie
app.delete('/api/movies/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex((m) => m.id === parseInt(id));
    if (movieIndex === -1) {
        return res.status(404).json({ error: "Movie not found" });
    }

    movies.splice(movieIndex, 1);
    res.json({ message: "Movie deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
