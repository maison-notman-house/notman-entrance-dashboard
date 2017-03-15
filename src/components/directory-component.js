import React from 'react';
import Card from './card';
import LocalizedStrings from 'react-localization';
import url from 'url';

let strings = new LocalizedStrings({
    en: {
        directory: 'Floor Directory',
        room: 'Room',
        occupant: 'Occupant',
    },
    fr: {
        directory: 'Annuaire',
        room: 'Salle',
        occupant: 'Occupant',
    }
});

export default class DirectoryComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            location: this.props.location,
            occupants: [],
            lang: props.lang
        };

        strings.setLanguage(props.lang);
    }

    componentWillReceiveProps(nextProps) {
        strings.setLanguage(nextProps.lang);
    }

    createRooms(entry) {
        return (
            <li key={entry.room}>
                <span className="room">{entry.room}</span>
                <span className="organization">{entry.occupant}</span>
            </li>
        );
    }

    updateOcupantData() {
        var scope = this;
        var requestUrl = url.parse(this.fetchUrl);

        requestUrl.query = {
            building: this.props.building
        };

        if (this.props.floor) {
            requestUrl.query.floor = this.props.floor;
        }

        fetch(url.format(requestUrl))
            .then(response => response.json())
            .then(function (data) {
                if (data && data.length > 0) {
                    scope.setState({occupants: data});
                }
            });
    }

    componentWillMount() {
        this.fetchUrl = 'http://notman.herokuapp.com/api/directory';
        this.updateOcupantData();
        this.refreshIntervalMinutes = 60; // Every hour
    }

    componentDidMount() {
        let scope = this;
        window
            .setInterval(function () {
                scope.updateOcupantData();
            }, (this.refreshIntervalSeconds * 1000));

    }

    render() {
        const location = this.state.location;
        const occupants = this.state.occupants;

        return (
            <Card size="7" className="directory">
                <h3>{strings.directory} ({location})</h3>
                <ul className="directory">
                    {occupants.map(e => {
                        return this.createRooms(e);
                    })}
                </ul>
            </Card>
        );
    }
}