import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const SPONSORS = [
  ['bdc.jpg', [641,427]],
  ['hydro-quebec.svg', [745,237]],
  ['google-for-partner.png', [937,936]],
  ['quickbooks_intuit.png', [1400,381]],
  ['FTQ.jpg', [639,174]],
  ['videotron.svg', [400,80]]
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
    return '/logos/' + SPONSORS[this.state.index][0];
  }

  getCurrentSponsorImageDimensions() {
    return SPONSORS[this.state.index][1];
  }

  update() {
    let index = (this.state.index + 1) % SPONSORS.length;
    console.log('Changed index to', index);
    this.setState({index});
  }

  render() {

     var dimensions = this.getCurrentSponsorImageDimensions();
     var ratio = 200 / dimensions[1];

     var style = {
        width: Math.round(dimensions[0] * ratio)+ 'px',
        height: Math.round(dimensions[1] * ratio) + 'px'
     };

     var spanStyle = {
        width: Math.round(dimensions[0] * ratio)+ 'px',
        height: Math.round(dimensions[1] * ratio) + 'px'
     }

    return <div className="Card SponsorsPanel">

        <ReactCSSTransitionGroup transitionName="transition" transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
            <div style={spanStyle} id={"sponsor-image-" + this.state.index} key={this.getCurrentSponsorImageUrl()}>
            <img className="sponsor-image " src={this.getCurrentSponsorImageUrl()} style={style}/>
            </div>
        </ReactCSSTransitionGroup>
    </div>;
  }
}
