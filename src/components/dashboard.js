import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Panel from './panel';
import LogoHeader from './logo-header';
import EventsCard from './events-card';
import WeatherCard from './weather-card';
import DeviceCard from './device-card';
import SponsorsCard from './sponsors-card';
import Columns from './columns';
import CurrentDate from './current-date';
import VideoPanel from './video-panel';
import STMCard from './stm-card'
import CoffeeCard from './coffee-card';

import Card from './card';
import Banner from './banner';
import DateBanner from './date-banner';

function TitleLine({children}) {
  return <div style={{lineHeight: '60px', fontSize: '60px'}}>{children}</div>;
}

function TextLine({children}) {
  return <div style={{lineHeight: '60px', fontSize: '20px'}}>{children}</div>;
}



class CardCycler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }
  
  componentDidMount() {
    this.timer = setInterval(this.onInterval, 9000);
  }
  
  onInterval = () => {
    let index = (this.state.index + 1) % React.Children.toArray(this.props.children).length;
    

    this.refs.wrapper.style.transform = 'scale(0.95) rotateX(90deg)';
    setTimeout(() => {
      this.setState({index});
    }, 500);
  }
  
  render() {
    const child = React.Children.toArray(this.props.children)[this.state.index];
    console.log(child);
    
    const wrapperStyle = {
      transform: 'scale(0.95) rotateX(-90deg)',
      transition: '0.5s all'
    };
    
    setTimeout(() => {
      this.refs.wrapper.style.transform = wrapperStyle.transform
    });
    
    console.log('Entering');
    
    const delay = 0;
    setTimeout(() => {
      this.refs.wrapper.style.transform = '';
    }, 500 + delay);
    
    return (
      <div ref="wrapper" style={wrapperStyle}>
        {child}
      </div>
    );
  }
}

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
    }.bind(this), 5000);
  }

  render() {
    var lang = 'en';

    return (
      <div lang={lang}>
      
        <DateBanner lang = {this.state.lang}/>
    
        <CardCycler>
          <CoffeeCard lang= {this.state.lang}/>
        </CardCycler>
        
        <DeviceCard lang = {this.state.lang} />
        <EventsCard lang = {this.state.lang}/>
        <WeatherCard lang = {this.state.lang}/>
        <STMCard lang = {this.state.lang}/>
        <SponsorsCard/>
      </div>
    );
  }
}