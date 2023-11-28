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
      const response = await fetch(
        "https://fetch-movies-a638d-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }
      const data = await response.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].description,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const errorRetry = () => {
    fetchMovies();
  };

  const stopHandler = () => {
    setError(null);
  };

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDelete={deleteMovieHandler} />;
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

  async function addMovieHandler(movie) {
    try {
      const response = await fetch(
        "https://fetch-movies-a638d-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Failed to add the movie. Please try again.");
      }

      // Optionally update the local state with the new movie if needed
    } catch (error) {
      console.error("Error adding movie:", error);
      // Handle the error (e.g., set an error state)
    }
  }

  async function deleteMovieHandler(id, updatedMovies) {
    const response = await fetch(
      `https://fetch-movies-a638d-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete the movie. Please try again.");
    }
    setMovies(updatedMovies);
  }

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
