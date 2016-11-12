import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Card from './card';
import './sponsors-card.css';

const PATH = '/images/logos';
const SPONSORS = [
  ['5000.png'],
  ['1000.png'],
  ['caisse.png'],
  ['videotron-service.png'],
  ['password_box.png'],
  ['dan_robichaud.png'],
  ['government.png'],
  ['bdc_logo.png'],
  ['hydro-quebec-2016.svg'],
  ['google-techhub.svg'],
  ['quickbooks_intuit.png'],
  ['FTQ.jpg'],
  ['videotron.svg'],
  ['Banque_nationale_du_Canada_Logo.png'],
  ['investissement-quebec.jpg']
];

const INTERVAL = 3500;

export default class SponsorsPanel extends React.Component {
  constructor() {
    super();
    this.state = { index: 0 };
  }

  componentDidMount() {
    this.intervalTimer = setInterval(this.update.bind(this), INTERVAL);
    this.preloadImages();
  }
  
  preloadImages() {
    SPONSORS.forEach(path => {
      const img = document.createElement(img);
      img.src = PATH + path;
      img.onload = function() { console.log('loaded') };
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }

  getCurrentSponsorImageUrl() {
    return 'images/logos/' + SPONSORS[this.state.index][0];
  }

  update() {
    let index = (this.state.index + 1) % SPONSORS.length;
    this.setState({index});
  }

  render() {
    const backgroundImage = `url(${this.getCurrentSponsorImageUrl()})`;

    return <Card size="2" className="SponsorsCard">
      <ReactCSSTransitionGroup transitionName="transition" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
        <div className="SponsorsCard-image" style={{backgroundImage}} key={this.state.index}/>
      </ReactCSSTransitionGroup>
    </Card>;
  }
}
