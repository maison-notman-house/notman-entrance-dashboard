import React from 'react';
import Moment from 'moment';

export default class CurrentTimeComponent extends React.Component {

    setTime() {
        var lang = 'en';
        this.setState({
            time: Moment(new Date())
                .locale(lang)
                .format('HH:mm')
        });
    }

    update() {}

    componentWillMount() {
        this.setTime();
    }

    componentDidMount() {
        window
            .setInterval(function () {
                this.setTime();
            }.bind(this), 1000);
    }

    render() {
        return <span id="timenow">{this.state.time}</span>;
    }

}
