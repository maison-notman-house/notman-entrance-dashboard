import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Panel from './panel';
import LogoHeader from './logo-header';
import EventsCard from './events-card';
import CurrentWeatherCard from './currentweather-card';
import ForecastWeatherCard from './forecastweather-card';
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

    this.getCurrentWeatherData().then(weatherData => {
      this.state.context.currentWeatherData = weatherData;
      this.setState({context: this.state.context})
    });

    this.getForecastWeatherData().then(weatherData => {
      this.state.context.forecastWeatherData = weatherData;
      this.setState({context: this.state.context})
    });

    this.getDeviceData().then(deviceData => {
      this.setState({deviceData})
    });
  }

  getEvents() {
    return fetch('https://notman.herokuapp.com/api/events?24hour=1')
      .then(response => response.json());
  }

  getCurrentWeatherData() {
    return fetch('http://api.openweathermap.org/data/2.5/weather?id=6077243&APPID=dc252e41ccdd53d06d044cde8f15dedb&units=metric&lang=en')
      .then(response => response.json());
  }

  getForecastWeatherData() {
    return fetch('http://api.openweathermap.org/data/2.5/forecast?id=6077243&units=metric&appid=dc252e41ccdd53d06d044cde8f15dedb')
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


            <SponsorsPanel/>
            <DeviceCard deviceData={this.state.deviceData}/>


          <EventsCard events={this.state.events}/>

          <CurrentWeatherCard weatherData={this.state.context.currentWeatherData}/>
          <ForecastWeatherCard weatherData={this.state.context.forecastWeatherData}/>

        </div>
      );
  }
}
