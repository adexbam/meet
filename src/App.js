import React, { Component } from "react";
import './App.css';
import EventList from './EventList.js';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';

class App extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      locations: []
    }
}

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  render() {
    const {events, locations} = this.state
    return (
      <div className="App">
        < CitySearch locations={locations} updateEvents={this.updateEvents} />
        < EventList events={events} />
        < NumberOfEvents/>
      </div>
    );
  }
}

export default App;
