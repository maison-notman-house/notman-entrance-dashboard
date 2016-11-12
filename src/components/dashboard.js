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

function TitleLine({children}) {
  return <div style={{lineHeight: '60px', fontSize: '60px'}}>{children}</div>;
}

function TextLine({children}) {
  return <div style={{lineHeight: '60px', fontSize: '20px'}}>{children}</div>;
}

function Banner({children, size=1}) {
  const style = {
    height: 120 * size
  };
  return <div className="Banner" style={style}>
    {children}
  </div>;
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

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var lang = 'en';

    return (
      <div lang={lang}>
      
        <Banner>
          <TitleLine>Saturday, November 12, 2016</TitleLine>
        </Banner>
        

        <CardCycler>
          <CoffeeCard/>
        </CardCycler>

          <SponsorsCard/>
        <Columns>
          <Card size="2">
          
          </Card>
          
          <Card size="2">
          </Card>
        </Columns>
        
        <Banner>
          <CurrentDate/>
        </Banner>

        <Card size="2">
          <TitleLine>Sponsors</TitleLine>
        </Card>
        
        <DeviceCard />

        <EventsCard/>

        <WeatherCard/>

        <STMCard/>

      </div>
    );
  }
}
