import React, { Component } from "react";
import './App.css';
import './nprogress.css';
import Menu from "./Menu";
import EventList from './EventList.js';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from "./WelcomeScreen";
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';

class App extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      errorText: '',
      warningText: '',
      showWelcomeScreen: undefined,
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
        errorText:'Select number from 1 to 32',
      })
    } else {
      this.setState({
        numberOfEvents: value,
        errorText: ''
      })
    }

  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    let isTokenValid;
    if (!accessToken && !navigator.onLine){
      isTokenValid = (await checkToken(accessToken)).error ? false : true;
      this.setState({
        warningText: 'You are offline, displayed list has been loaded from the cache.'
      })
    }
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const {events, locations, numberOfEvents, errorText, showWelcomeScreen, warningText } = this.state
    if (showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App" id="target">
        < Menu />
        < CitySearch locations={locations} updateEvents={this.updateEvents} />
        < NumberOfEvents errorText={errorText} numberOfEvents={numberOfEvents} updateInputChange={this.updateInputChange} />
        < EventList events={events.slice(0, numberOfEvents) } warningText={warningText} />
        < WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
