import React from 'react';

export default class EventsCardComponent extends React.Component {

    updateEventsData() {
        fetch(this.fetchUrl)
            .then(response => response.json())
            .then(function (data) {
                return data;
            })
            .then(function (data) {
                this.setState({events: data});
            }.bind(this));

    }

    locationForDisplay(room) {
        const locationMap = {
            'cafe': 'osmo café',
            'big room': 'big room',
            'glass door room': 'glass door',
            'glass door': 'glass door'
        };
        if (locationMap[room]) {
            return locationMap[room];
        }

        return room;
    }

    createDay(e) {
        let items = e
            .items
            .map((e, idx) => {
                return <div className="event" key={e.date + '-' + idx}>
                    <span
                        className={"roomlabel " + e
                        .tags
                        .join(', ')
                        .replace(' ', '')}>{this.locationForDisplay(e.tags.join(', '))}</span>
                    <span className="eventtime">{e.start}</span>
                    <span className="eventname">{e.title}</span>
                </div>;
            });

        return <div className="EventsCard-day" key={e.date}>
            <div className="EventsCard-day-name">
                {e.day}
            </div>

            {items}
        </div>;
    }

    componentWillMount() {
        this.refreshIntervalMinutes = 15;
        this.fetchUrl = 'https://notman.herokuapp.com/api/events?24hour=1';
        this.updateEventsData();
    }

    componentDidMount() {
        window
            .setInterval(function () {
                this.updateEventsData();
            }.bind(this), (this.refreshIntervalMinutes * 60 * 1000));
    }

    render() {

        let events = [];
        if (this.state && this.state.events) {
            events = this.state.events;
        }

        return <div className="EventsCard Card">
            {events.map(e => {
                return this.createDay(e);
            })}
        </div>;
    }

}