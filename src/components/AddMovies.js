import React, { useRef } from "react";
import classes from "./AddMovies.module.css";

const AddMovies = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();

    const moviesList = {
      title: titleRef.current.value,
      description: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(moviesList);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="date" id="date" ref={releaseDateRef} />
      </div>
      <button className={classes.btn}>Add Movie</button>
    </form>
  );
};

export default AddMovies;
