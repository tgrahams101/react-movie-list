import React from 'react';
import PropTypes from 'prop-types';


class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleToAdd: '',
      descriptionToAdd: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({titleToAdd: event.target.value});
  }
  handleChangeDesc(event) {
    console.log(event.target.value);
    this.setState({descriptionToAdd: event.target.value});
  }

  clear() {
    this.refs.description.value = "";
    this.refs.title.value = "";
  }


  render() {
    return (
      <div>
        <h4> Movie title to add </h4>
        <input type="text" placeholder="Title" ref="title" onChange={this.handleChange} /> <input type="text" ref="description" placeholder="description" onChange={this.handleChangeDesc} />
        <button onClick={ () => {this.props.addMovie.call(null, {title: this.state.titleToAdd, description: this.state.descriptionToAdd}); this.clear() }}> Add This Movie </button>
      </div>
    )
  }
}

export default AddMovie;
