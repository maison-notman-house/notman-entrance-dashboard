import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Panel from './panel';
import LogoHeader from './logo-header';
import EventsCard from './events-card';
import WeatherCard from './weather-card';
import DeviceCard from './device-card';
import SponsorsPanel from './sponsors-panel';
import Columns from './columns';
import CurrentDate from './current-date';
import VideoPanel from './video-panel';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

        <WeatherCard/>

        <VideoPanel/>

      </div>
    );
  }
}
