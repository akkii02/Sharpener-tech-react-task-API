import React from 'react';
import Movie from './Movie';
import classes from './MoviesList.module.css';

const MoviesList = (props) => {
  const deleteHandler = (id) => {
    const updatedMovies = props.movies.filter((movie) => movie.id !== id);
    props.onDelete(id, updatedMovies);
  };
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          openingText={movie.openingText}
          releaseDate={movie.releaseDate}
          onDelete={deleteHandler}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
