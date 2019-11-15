import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  componentDidUpdate(pp, ps, ss) {
    console.log(this.props.movieEdite.title);
    if (this.props.movieEdite.title) {
      axios
        .get("http://localhost:5000/api/movies")
        .then(res => this.setState({ movies: res.data }))
        .catch(err => console.log(err.response));
      this.props.setMovieEdite({});
    }

    if (this.props.checkdelete) {
      axios
        .get("http://localhost:5000/api/movies")
        .then(res => this.setState({ movies: res.data }))
        .catch(err => console.log(err.response));
      this.props.setcheckdelete(false);
    }
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
