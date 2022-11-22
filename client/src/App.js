import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = { message: "Default message" }
  }

  componentDidMount = () => {
    axios.get("http://localhost:5000/hello").then(response => {
      console.log(response.data);
      this.setState({ message: response.data })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.message}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
