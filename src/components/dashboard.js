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
import CurrentDate from './current-date';
import VideoPanel from './video-panel';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { context: {} }
  }

  componentDidMount() {

    this.getForecastWeatherData().then(weatherData => {
      this.state.context.forecastWeatherData = weatherData;
      this.setState({ context: this.state.context })
    });

  }

  getForecastWeatherData() {
    return fetch('http://api.openweathermap.org/data/2.5/forecast?id=6077243&units=metric&appid=dc252e41ccdd53d06d044cde8f15dedb')
      .then(response => response.json());
  }

  render() {
    var lang = 'en';

    return (
      <div lang={lang}>

        <LogoHeader/>

        <Panel>
          <CurrentDate/>
        </Panel>

        <SponsorsPanel/>
        <DeviceCard />

        <EventsCard/>

        <CurrentWeatherCard weatherData={this.state.context.currentWeatherData}/>

        <VideoPanel/>

      </div>
    );
  }
}
