import React, { Component } from "react";
import './App.css';
import './nprogress.css';
import EventList from './EventList.js';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

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
      const locationEvents = (location === 'all') ? 
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const {events, locations} = this.state
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        < CitySearch locations={locations} updateEvents={this.updateEvents} />
        <p></p>
        < NumberOfEvents/>
        < EventList events={events} />
      </div>
    );
  }
}

export default App;
