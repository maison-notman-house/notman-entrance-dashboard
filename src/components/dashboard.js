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
import STMCard from './stm-card'

const LANGUAGES =  ['en', 'fr']

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langIndex: 0,
      lang: 'en'
    };
  }


  changeLanguage(){
    let langIndex = (this.state.langIndex + 1) % LANGUAGES.length;
    this.setState({
      langIndex: langIndex,
      lang: LANGUAGES[langIndex]
    }) 
  }

  componentDidMount(){

    window.setInterval(function () {
      this.changeLanguage();
    }.bind(this), 3000);
  }

  render() {
    var lang = 'en';

    return (
      <div lang={lang}>

        <LogoHeader/>

        <Panel>
          <CurrentDate lang = {this.state.lang}/>
        </Panel>

        <SponsorsPanel/>
        <DeviceCard lang = {this.state.lang}/>

        <EventsCard/>

        <WeatherCard lang = {this.state.lang}/>

        <STMCard lang = {this.state.lang}/>

      </div>
    );
  }
}