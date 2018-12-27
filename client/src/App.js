import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './containers/Layout/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        My first react app
      </div>
    );
  }
}

export default App;
