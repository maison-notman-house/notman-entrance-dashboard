import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Card from './card';
import './sponsors-card.css';

const SPONSORS = [
  ['5000.png', [5038,950]],
  ['1000.png',[3983,800]],
  ['caisse.png', [1756,438]],
  ['videotron-service.png', [1626,317]],
  ['password_box.png', [1193,1199]],
  ['dan_robichaud.png', [1074,300]],
  ['government.png', [4066,800]],
  ['bdc_logo.png', [644,325]],
  ['hydro-quebec-2016.svg', [745,237]],
  ['google-techhub.svg', [937,936]],
  ['quickbooks_intuit.png', [1400,381]],
  ['FTQ.jpg', [639,174]],
  ['videotron.svg', [400,80]],
  ['Banque_nationale_du_Canada_Logo.png', [1703,444]],
  ['investissement-quebec.jpg', [2552,1037]]
];

const LOADED_IMAGES = [];
let count = 0;

const SPONSOR_IMAGES = SPONSORS.map(s => {
  const img = document.createElement('img');
  img.src = 'images/logos/' + s[0];
  console.log('loading', s[0])
  img.onload = function() {
    console.log('loaded', img.src, img.height, img.width);
    LOADED_IMAGES.push(img);
    count++;
    console.log('COUNT', count, 'VS', SPONSORS.length);
    if (count == SPONSORS.length) {
      done(LOADED_IMAGES);
    }
  };
  img.onerror = function() {
    console.log('error loading', img);
    count++;
    if (count == SPONSORS.length) {
      done(LOADED_IMAGES);
    }
  }
  return img;
});

function done() {
  console.log('DONE LOADING IMAGS');
}


const INTERVAL = 3500;

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
        return 'images/logos/' + SPONSORS[this.state.index][0];
    }

    getCurrentSponsorImageDimensions() {
        return SPONSORS[this.state.index][1];
    }

  update() {
    console.log('UPDATING SPONSORS');
    let index = (this.state.index + 1) % SPONSORS.length;
    this.setState({index});
  }

  render() {
    const backgroundImage = `url(${this.getCurrentSponsorImageUrl()})`;
    console.log('rending card again', backgroundImage);
    
    return <Card size="2" className="SponsorsCard">
      <ReactCSSTransitionGroup transitionName="transition" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
        <div className="SponsorsCard-image" style={{backgroundImage}} key={this.state.index}/>
      </ReactCSSTransitionGroup>
    </Card>;
  }

}
