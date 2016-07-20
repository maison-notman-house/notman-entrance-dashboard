import React from 'react';
import Moment from 'moment';

// export default function TimePanel() {
//    var time = Moment(new Date()).format('HH:mm');
//    return <span id="timenow">{time}</span>
// }


export default class CurrentTimeComponent  extends React.Component {

  setTime() {
     this.setState({
        time: Moment(new Date()).format('HH:mm')
     });
  }

  update() {

  }

  componentWillMount() {
  	this.setTime();
  }

  componentDidMount() {
  	 window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);
  }

  render() {
   return <span id="timenow">{this.state.time}</span>
  }

}
