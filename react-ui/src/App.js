import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsCount: null,
      searchQuery: '',
      fetching: false,
      fetchSuccessful: false
    };
  }

  componentDidMount() {

  }

  handleChange = e => this.setState({ searchQuery: e.target.value });
  searchForTrends = () => {
    const searchQuery = this.state.searchQuery.trim();
    if (searchQuery) {
      console.log('fetching...')
      this.setState({ fetching: true });

      fetch(`/api?searchQuery=${searchQuery}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`status ${response.status}`);
          }
          return response.json();
        })
        .then(json => {
          console.log('resuls are ', json)
          this.setState({
            resultsCount: json.length,
            fetching: false,
            fetchSuccessful: true
          });
          console.log(' done fetching...')

        }).catch(e => {
          this.setState({
            message: `API call failed: ${e}`,
            fetching: false
          });
        })
    } else {
      console.error('No search term entered');
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Nimbus</h2>
        </div>

        <input
          onChange={this.handleChange}
          value={this.state.searchQuery}
          placeholder={'Search for trends'}
        />
        <button
          onClick={this.searchForTrends}
        >Get Data</button>

        <p className="App-intro">
          {(this.state.fetching && this.state.searchQuery) &&
            'Fetching message from API'
          }
          {(this.state.fetchSuccessful && this.state.searchQuery) &&
            `Your search for ${this.state.searchQuery} returned ${this.state.resultsCount} objects. Press CTRL + SHIFT + i to see them in the console.`
          }
        </p>
      </div>
    );
  }
}

export default App;
