import React, { Component } from "react";
import './App.css';
import EventList from './EventList.js';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      locations: []
    }
}

  render() {
    const {events, locations} = this.state
    return (
      <div className="App">
        < CitySearch locations={locations} />
        < EventList events={events} />
        < NumberOfEvents/>
      </div>
    );
  }
}

export default App;
