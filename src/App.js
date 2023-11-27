import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovies from "./components/AddMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  function errorRetry() {
    fetchMovies();
  }

  const stopHandler = () => {
    setError(null);
  };

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = (
      <>
        <p>{error}</p>
        <button onClick={stopHandler}>Stop retry</button>
      </>
    );
  }

  if (isLoading) {
    content = <p>Loading....</p>;
  }
  const addMovieHandler = (movie) => {
    console.log(movie);
  };
  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies} disabled={isLoading}>
          Fetch Movies
        </button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
