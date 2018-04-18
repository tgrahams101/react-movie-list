import React from 'react';
import ReactDOM  from 'react-dom';
import movies, {add} from './sampleMovieData.js';
import Movie from './components/Movie.jsx';
import Search from './components/Search.jsx';
import AddMovie from './components/AddMovie.jsx';
import axios from 'axios';


class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      showWatched: null
    };
    this.filter = this.filter.bind(this, movies);
    this.addMovie = this.addMovie.bind(this);
    this.toggleWatched = this.toggleWatched.bind(this);
    this.showMovies = this.showMovies.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/movies')
      .then( (response) => {
        console.log('RESULTS FROM AXIOS CALL', response.data);
        this.setState({movies: response.data});

      })
      .catch( (error) => {
        console.log('ERROR FROM AXIOS CALL', error);
      })
  }

  filter(list, query) {
    console.log(movies);
    let movies = list.filter( (item) => {
      if (item.title.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
      return false;
    })
    if (!movies.length) {
      this.setState({movies: list});
    } else {
      this.setState({movies: movies})
    }
  }

  addMovie(movie) {
    console.log('HITTING THE ADDMOVIE', movie);
    let {title, description} = movie;
    console.log(title, description);
    console.log('AS OBJECT', {title, description});
    //OLD ADD METHOD THAT USED A FILE ON CLIENT SIDE TO STORE TEMP DATA
    // add({title, description});
    axios.post('http://localhost:3000/movie', movie)
      .then((results) => {
        console.log('SUCCESSFUL AXIOS POST', results);
        this.setState({movies: results.data})
      })
      .catch( (error) => {
        console.log('ERROR FROM ADDMOVIE POST', error);
      })

    console.log(movies);
    this.setState({movies: movies});
  }

  toggleWatched(boolean) {
    if (boolean === true) {
      this.setState({showWatched: true});
    } else if (boolean === false) {
      this.setState({showWatched: false});
    } else {
      this.setState({showWatched: null});
    }
  }

  showMovies() {

    if (this.state.movies) {
      return this.state.movies.map( (item, index) => {
         return <Movie movie={item} key={index} toggleWatched={this.state.showWatched}/>
      })
    } else {
      return null;
    }

  }

  render() {
    return (
    <div>
      <div>
         <AddMovie addMovie={this.addMovie} />
     </div>
      <div>
        <Search filter={this.filter} />
      </div>
      <div>
      <button onClick={this.toggleWatched.bind(null, true)}> Show Watched </button> <button onClick={this.toggleWatched.bind(null, false)}> Show Not-Watched </button> <button onClick={this.toggleWatched.bind(null, null)}> Show All </button>
      {(() => {
        if (this.state.movies) {
          return this.state.movies.map( (item, index) => {
             return <Movie movie={item} key={index} toggleWatched={this.state.showWatched}/>
          })
        } else {
          return null;
        }
      })() }
      </div>
    </div>)
  }
}

ReactDOM.render( <MovieList />, document.getElementById('app'));
