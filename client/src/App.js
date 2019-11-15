import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import axios from "axios";

const App = () => {
  const [checkdelete, setcheckdelete] = useState(false);
  const [savedList, setSavedList] = useState([]);
  const [movieEdite, setMovieEdite] = useState({});

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const editeToMovie = (event, movie, history) => {
    event.preventDefault();
    console.log(movie);
    setMovieEdite(movie);
    history.push("/update/:id");
  };
  console.log(movieEdite.length);

  const onSubmit = (values, history) => {
    axios
      .put(`http://localhost:5000/api/movies/${movieEdite.id}`, values)
      .then(history.push("/"));
    // setMovieEdite({});
  };
  const deletemovie = (event, mo, history) => {
    event.preventDefault();
    console.log(mo);
    axios
      .delete(`http://localhost:5000/api/movies/${mo.id}`)
      .then(history.push("/"));
    setcheckdelete(true);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact
        path="/"
        render={props => (
          <MovieList
            {...props}
            movieEdite={movieEdite}
            setMovieEdite={setMovieEdite}
            checkdelete={checkdelete}
            setcheckdelete={setcheckdelete}
          />
        )}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return (
            <Movie
              {...props}
              editeToMovie={editeToMovie}
              addToSavedList={addToSavedList}
              deletemovie={deletemovie}
            />
          );
        }}
      />
      <Route
        path="/update/:id"
        render={props => (
          <UpdateMovie {...props} movie={movieEdite} onSubmit={onSubmit} />
        )}
      />
    </>
  );
};

export default App;
