import React, { Component } from "react";
import './App.css';
import './nprogress.css';
import Menu from "./Menu";
import EventList from './EventList.js';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from "./WelcomeScreen";
import EventGenre from "./EventGenre";
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

class App extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      errorText: '',
      warningText: 'You are offline, displayed list has been loaded from the cache.',
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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    let isTokenValid;
    if (accessToken && !navigator.onLine){
      isTokenValid = true;
    } else {
      isTokenValid = (await checkToken(accessToken)).error ? false : true;
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
        < EventGenre events={events} />
        <ResponsiveContainer height={400} >
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              allowDecimals={false}
              type="number"
              dataKey="number"
              name="number of events"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        < EventList events={events.slice(0, numberOfEvents) } warningText={warningText} />
        < WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
