import React from 'react';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        'cafe': 'osmo café',
        'big room': 'clark room',
        'glass door room': 'st-urbain room',
        'glass door': 'st-urbain room',
        'clark room': 'clark room',
        'st-urbain room': 'st-urbain room',
        'st-urbain': 'st-urbain room',        
        'both rooms': '3rd floor',
        '3rd floor': '3rd floor',
        'Today': 'Today',
        'Tomorrow': 'Tomorrow',
        'Monday': 'Monday',
        'Tuesday': 'Tuesday',
        'Wednesday': 'Wednesday',
        'Thursday': 'Thursday',
        'Friday': 'Friday',
        'Saturday': 'Saturday',
        'Sunday': 'Sunday'
    },
    fr: {
        'cafe': 'café osmo',
        'big room': 'salle clark',
        'glass door room': 'salle st-urbain',
        'glass door': 'salle st-urbain',
        'clark room': 'salle clark',
        'st-urbain room': 'salle st-urbain',
        'st-urbain': 'salle st-urbain',  
        'both rooms': '3ieme étage',
        '3rd floor': '3ieme étage',
        'Today': "Aujourd'hui",
        'Tomorrow': 'Demain',
        'Monday': 'Lundi',
        'Tuesday': 'Mardi',
        'Wednesday': 'Mercredi',
        'Thursday': 'Jeudi',
        'Friday': 'Vendredi',
        'Saturday': 'Samedi',
        'Sunday': 'Dimanche'
    }
});

const roomToKey = {
    'glass door room': 'st-urbain',
    'glass door': 'st-urbain',
    'glassdoor': 'st-urbain',
    'saint-urbain': 'st-urbain',
    'st-urbain': 'st-urbain',
    'st-urbain room': 'st-urbain',
    'bigroom': 'clark',
    'big room': 'clark',
    'clark room': 'clark',
    'clark': 'clark',
    'osmocafe': 'osmocafe',
    'osmo cafe': 'osmocafe',
    'cafe': 'osmocafe',
    'café': 'osmocafe',
    '3rd floor': 'floor3',
    'bdc': 'bdc',
    'terrace': 'terrace',
    'cisco': 'cisco',
    'ciscoroom': 'cisco',
    'cisco room': 'cisco',
    'videotron': 'videotron'
};
export default class EventsCardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lang: props.lang
        };

        strings.setLanguage(props.lang);        
    }

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
            'cafe': strings.cafe,
            'big room': strings['big room'],
            'glass door room': strings['glass door'],
            'glass door': strings['glass door'],
            'both rooms': strings['both rooms']
        };
        if (locationMap[room]) {
            return locationMap[room];
        }

        return room;
    }

    createDay(day) {
        let items = day
            .items
            .map((event, idx) => {
                var roomRef = roomToKey[event.room];
                if (!roomRef && event.room) {
                    roomRef = event.room.replace(' ', '');
                }
                return <div className="event" key={event.date + '-' + idx}>
                    <span
                        className={'roomlabel ' + roomRef}>
                        {this.locationForDisplay(event.tags.join(', '))}
                    </span>
                    <span className="eventtime">{event.start}</span>
                    <span className="eventname">{event.title}</span>
                </div>;
            });

        return <div className="EventsCard-day" key={day.date}>
            <div className="EventsCard-day-name">
                {strings[day.day]}
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

    componentWillReceiveProps(nextProps) {
        strings.setLanguage(nextProps.lang);
        this.setState({});
    }
    

    render() {

        let events = [];
        if (this.state && this.state.events) {
            events = this.state.events;
        }

        return <div className="EventsCard Card">
            {events.map(day => {
                return this.createDay(day);
            })}
        </div>;
    }

}