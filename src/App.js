import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Nimbus</h1>
        </header>
        <p className="App-intro">
          { 'Words in the sky' }
        </p>
        <button onClick={() => console.error('gotcha')}>Make request</button>
      </div>
    );
  }
}

export default App;
