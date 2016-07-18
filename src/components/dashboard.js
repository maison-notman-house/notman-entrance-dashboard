import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Panel from './panel';
import LogoHeader from './logo-header';
import EventsCard from './events-card';
import WeatherCard from './weather-card';
import DeviceCard from './device-card';
import SponsorsPanel from './sponsors-panel';
import Columns from './columns';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { context : {} }
  }

  componentDidMount () {
    this.getEvents().then(events => {
      this.setState({events})
    });

    this.getWeatherData().then(weatherData => {
      this.setState({weatherData});
    });

    this.getDeviceData().then(deviceData => {
      this.setState({deviceData})
    });
  }

  getEvents() {
    return fetch('https://notman.herokuapp.com/api/events')
      .then(response => response.json());
  }

  getWeatherData() {
    return fetch('http://api.openweathermap.org/data/2.5/forecast/city?id=6077243&APPID=dc252e41ccdd53d06d044cde8f15dedb&units=metric&cnt=3')
      .then(response => response.json());
  }

  getDeviceData() {
    return fetch('http://www.hyperlocalcontext.com/contextat/directory/notman')
      .then(response => response.json());
  }

  render() {
      return (
        <div>

          <LogoHeader/>

          <Panel>
            <span className="strong">Événements Maison Notman</span> &bull; Notman House Events
          </Panel>

          <Columns>
            <SponsorsPanel/>
            <DeviceCard deviceData={this.state.deviceData}/>
          </Columns>

          <EventsCard events={this.state.events}/>

          <WeatherCard weatherData={this.state.weatherData}/>

        </div>
      );
  }
}