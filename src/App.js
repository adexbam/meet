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
      locations: [],
      numberOfEvents: 32,
      errorText: '',
    }
}

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? 
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount=this.state.numberOfEvents)
      });
    });
  }

  updateInputChange = (event) => {
    const value = event.target.value;
    if (value > 32) {
      this.setState({
        errorText:'Please enter number from 1 to 32',
      })
    } else {
      this.setState({
        numberOfEvents: value,
        errorText: ''
      })
    }

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
    const {events, locations, numberOfEvents, errorText } = this.state
    return (
      <div className="App">
        <h1 className="meet-logo">LetsMeetUp</h1>
        <h4>Choose your nearest city</h4>
        < CitySearch locations={locations} updateEvents={this.updateEvents} />
        < NumberOfEvents errorText={errorText} numberOfEvents={numberOfEvents} updateInputChange={this.updateInputChange} />
        < EventList events={events.slice(0, numberOfEvents)} />
      </div>
    );
  }
}

export default App;
