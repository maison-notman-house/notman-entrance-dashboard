import React from 'react';
import Moment from 'moment';

export default class CurrentDateComponent extends React.Component {

    setTime(lang) {
        var date = Moment(new Date())
            .locale(lang)
            .format('dddd, DD MMMM YYYY');
        date = date
            .charAt(0)
            .toUpperCase() + date.slice(1);
        this.setState({time: date});
    }

    update() {}

    componentWillMount() {
        this.setTime('en');
    }
    /*
 componentDidMount() {
  	 window.setInterval(function () {
      this.setTime();
    }.bind(this), 60000);
  }*/

    componentWillReceiveProps(nextProps) {
        this.setTime(nextProps.lang);
    }

    render() {
        return <span id="datenow">{this.state.time}</span>;
    }

}
