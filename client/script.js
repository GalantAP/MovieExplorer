const apiURL = "http://localhost:5000/api/movies";
const movieList = document.getElementById("movie-list");
const form = document.getElementById("add-movie-form");
const titleInput = document.getElementById("movie-title");
const yearInput = document.getElementById("movie-year");
const searchInput = document.getElementById("search-movie");
const searchButton = document.getElementById("search-button");

let movies = [];

// Fetch movies
async function fetchMovies() {
  const response = await fetch(apiURL);
  movies = await response.json();
  displayMovies(movies);
}

// Display movies
function displayMovies(movies) {
  movieList.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
      <h2>${movie.title}</h2>
      <p>${movie.year}</p>
      <button onclick="deleteMovie(${movie.id})">Delete</button>
    `;
    movieList.appendChild(movieCard);
  });
}

// Add movie
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newMovie = {
    title: titleInput.value,
    year: yearInput.value,
  };
  await fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMovie),
  });
  titleInput.value = "";
  yearInput.value = "";
  fetchMovies();
});

// Delete movie
async function deleteMovie(id) {
  await fetch(`${apiURL}/${id}`, { method: "DELETE" });
  fetchMovies();
}

// Search movie
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm)
  );
  displayMovies(filteredMovies);
});

// Initial load
fetchMovies();
