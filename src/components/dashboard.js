import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Panel from './panel';
import LogoHeader from './logo-header';
import EventsCard from './events-card';
import WeatherCard from './weather-card';
import SponsorsPanel from './sponsors-panel';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { context : {} }
  }
  
  componentDidMount () {
    this.getEvents().then(events => {
      this.state.context.events = events;
      this.setState({context: this.state.context})
    });

    this.getWeatherData().then(weatherData => {
      this.state.context.weatherData = weatherData;
      this.setState({context: this.state.context})
    });
  }
  
  getEvents() {
    return fetch('https://notman.herokuapp.com/api/events')
      .then(response => response.json());
  }
  
  getWeatherData() {
    return fetch('http://api.openweathermap.org/data/2.5/forecast/city?id=6077243&APPID=dc252e41ccdd53d06d044cde8f15dedb&units=metric')
      .then(response => response.json());
  }
  
  render() {
      return (
        <div>
        
          <LogoHeader/>
          
          <Panel>
            <span className="strong">Événements Maison Notman</span> &bull; Notman House Events
          </Panel>

          <EventsCard events={this.state.context.events}/>
          <WeatherCard weatherData={this.state.context.weatherData}/>
          
          <Panel className="footer">
            <span className="strong">Sponsors</span>
          </Panel>
          
          <SponsorsPanel/>
          
        </div>
      );
  }
}