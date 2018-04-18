import React from 'react';
import PropTypes from 'prop-types';
import MovieDetails from './MovieDetails.jsx';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watched: false,
      details: false
    }
    this.toggleWatched = this.toggleWatched.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  toggleWatched() {
    this.setState({watched: !this.state.watched});
  }

  determineShowDetails() {
    if (this.state.details) {
      return (
        <MovieDetails description={this.props.movie.description} />
      )
    } else {
      return null;
    }
  }

  showDetails() {
    this.setState({details: !this.state.details})
  }

  render() {
    let color = this.state.watched ? {color: 'green', 'fontWeight': 'bold'} : {color: 'black'};
    let picUrl = `http://image.tmdb.org/t/p/w185/${this.props.movie.poster_url}`;
     if (this.props.toggleWatched === null || this.props.toggleWatched === this.state.watched) {
      return (
        <div className="movieBlock">
          <h1 onClick={this.showDetails}>{this.props.movie.title} </h1>
          <img src={picUrl} style={{display: 'block', 'margin-bottom': '20px'}}/>
          <button onClick={this.toggleWatched} style={color}> Watched? </button>
          {this.determineShowDetails()}
        </div>
      )
    } else {
      return null;
    }
  }
}

Movie.propTypes = {
  movie: PropTypes.object
}


export default Movie;
