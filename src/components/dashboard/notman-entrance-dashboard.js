import React from 'react';

import Panel from '../panel';
import LogoHeader from '../logo-header';
import EventsCard from '../events-card';
import WeatherCard from '../weather-card';
import DeviceCard from '../device-card';
import SponsorsPanel from '../sponsors-panel';
import CurrentDate from '../current-date';
import STMCard from '../stm-card';
import DirectoryCard from '../directory-component';
import Columns from '../columns';

import BodyClass from '../body-class';
import TwitterCard from '../twitter-card';

const LANGUAGES = ['en', 'fr'];

export default class OsmoEntranceDashboard extends React.Component {

    render() {

        var location = this.props.location;
        var floor = this.props.floor;
        var building = this.props.building;
        var lang = this.props.lang;

        return (
            <div lang={lang}>

                <LogoHeader lang={lang}/>

                <Panel>
                    <CurrentDate lang={lang}/>
                </Panel>

                <EventsCard lang={lang}/>

                <DeviceCard lang={lang}/>
                <WeatherCard lang={lang}/>

                <STMCard lang={lang}/>
                <SponsorsPanel lang={lang}/>

            </div>
        );
    }

}
