import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    console.log(this.props);
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    console.log(this.state.movie);
    return (
      <div className="save-wrapper">
        <MovieCard
          history={this.props.history}
          movie={this.state.movie}
          editeToMovie={this.props.editeToMovie}
        />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button
          onClick={event =>
            this.props.editeToMovie(event, this.state.movie, this.props.history)
          }
        >
          Edite
        </button>
        <button
          onClick={event =>
            this.props.deletemovie(event, this.state.movie, this.props.history)
          }
        >
          Delete
        </button>
      </div>
    );
  }
}
