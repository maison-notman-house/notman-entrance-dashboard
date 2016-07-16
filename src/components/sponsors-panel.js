import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const SPONSORS = [
  'bdc.jpg',
  'hydro-quebec.svg',
];

const INTERVAL = 6000;

export default class SponsorsPanel extends React.Component {
  constructor() {
    super();
    this.state = { index: 0 };  
  }
  
  componentDidMount() {
    this.intervalTimer = setInterval(this.update.bind(this), INTERVAL);
  }
  
  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }
   
  getCurrentSponsorImageUrl() {
    return '/logos/' + SPONSORS[this.state.index];
  }  
  
  update() {
    let index = (this.state.index + 1) % SPONSORS.length; 
    console.log('Changed index to', index);
    this.setState({index});
  }
  
  render() {  
    return <div className="Panel SponsorsPanel">
      <ReactCSSTransitionGroup transitionName="transition" transitionEnterTimeout={800} transitionLeaveTimeout={800}>
        <img className="sponsor-image" src={this.getCurrentSponsorImageUrl()} key={this.getCurrentSponsorImageUrl()} />
      </ReactCSSTransitionGroup>
    </div>;
  }
}
