import React, { Component } from 'react'
import './App.css'
import AjaxUtils from './ajax-utils'
import SearchBox from './SearchBox'
import SongsList from './SongsList'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      resultsArray : [],
      isLoading: false,
      queryChangeTimeout: null,
      query: ""
    }

    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.setIsLoadingState = this.setIsLoadingState.bind(this)
    this.makeAjaxCallForSearchResults = this.makeAjaxCallForSearchResults.bind(this)
  }

  makeAjaxCallForSearchResults() {
    const query = this.state.query
    if (!query) {
      this.setIsLoadingState(false)
      return
    }

    AjaxUtils.getSearchResults(query, function(searchResults) {
      console.log('ajax call sent')
      if (searchResults) {
        this.setState({
          resultsArray: searchResults
        })
      }
      this.setIsLoadingState(false)
    }.bind(this), (e) => {
      this.setIsLoadingState(false)
      console.log(e.toString())
    })
  }

  handleQueryChange(query) {
    this.setIsLoadingState(true)
    clearTimeout(this.state.queryChangeTimeout)

    let queryChangeTimeout = setTimeout(this.makeAjaxCallForSearchResults, 300)
    this.setState({
      queryChangeTimeout: queryChangeTimeout,
      query: query
    })
  }

  setIsLoadingState(value) {
    this.setState({
      isLoading: value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 id="sound">SOUND</h2><h2 id="stash">STASH</h2>
        </div>
        <div className="App-container">
          <SearchBox onChange={this.handleQueryChange} isLoading={this.state.isLoading}/>
          <SongsList resultsArray={this.state.resultsArray} />
        </div>
      </div>
    );
  }
}

export default App