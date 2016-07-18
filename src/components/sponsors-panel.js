import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const SPONSORS = [
  'hackthehouse-breathing.gif',
  'hackthehouse-smiling.gif',
];

const INTERVAL = 9000;

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
    return <div className="Card SponsorsPanel">
        <ReactCSSTransitionGroup transitionName="transition" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
          <div className="SponsorsPanel--container" key={this.getCurrentSponsorImageUrl()}>
            <img className="sponsor-image" src={this.getCurrentSponsorImageUrl()}/>
          </div>
        </ReactCSSTransitionGroup>
    </div>;
  }
}
