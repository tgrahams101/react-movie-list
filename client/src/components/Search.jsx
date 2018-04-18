import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchQuery : ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({searchQuery: event.target.value});
  }

  handleClick() {
    console.log('THIS IS', this.state.searchQuery);
    this.props.filter(this.state.searchQuery);
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.handleClick}> Search </button>
      </div>
    )
  }
}

export default Search;
