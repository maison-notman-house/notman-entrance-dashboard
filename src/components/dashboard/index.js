import React from 'react';


import BodyClass from '../body-class';

import GenericLandscapeDashboard from './generic-landscape-dashboard';
import NotmanEntranceDashboard from './notman-entrance-dashboard';
import FrontHouseDashboard from './fronthouse-dashboard';

const LANGUAGES = ['en', 'fr'];

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        var location = props.location.query.location;
        if (!location) {
            location = 'entrance';
        }

        this.state = {
            langIndex: 0,
            location: location,
            lang: LANGUAGES[0]
        };
    }

    changeLanguage() {
        let langIndex = (this.state.langIndex + 1) % LANGUAGES.length;
        this.setState({langIndex: langIndex, lang: LANGUAGES[langIndex]});
    }

    componentDidMount() {
        window
            .setInterval(function () {
                this.changeLanguage();
            }.bind(this), 5000);
    }

    render() {
        var lang = this.state.lang;

        if (this.state.location === 'campus-1') {
            BodyClass.addClassToBody('landscape campus-1');
            return <GenericLandscapeDashboard lang={lang} building="campus" floor="1" location="Campus - Floor 1" />;
        } else if (this.state.location === 'campus-2') {
            BodyClass.addClassToBody('landscape campus-2');
            return <GenericLandscapeDashboard lang={lang} building="campus" floor="2" location="Campus - Floor 2" />;
        } else if (this.state.location === 'fronthouse') {
            BodyClass.addClassToBody('landscape fronthouse');
            return <FrontHouseDashboard lang={lang} building="front" location="Front House" />;
        } else {
            BodyClass.addClassToBody('portrait entrance');
            return <NotmanEntranceDashboard lang={lang} building="front" location="Front House" />;
        }
    }
}
