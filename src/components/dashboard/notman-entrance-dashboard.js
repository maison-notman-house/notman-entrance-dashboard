import React from 'react';

import Panel from '../panel';
import LogoHeader from '../logo-header';
import EventsCard from '../events-card';
import WeatherCard from '../weather-card';
import DeviceCard from '../device-card';
import SponsorsPanel from '../sponsors-panel';
import CurrentDate from '../current-date';
import STMCard from '../stm-card';
import BixiCard from '../bixicard';
import DirectoryCard from '../directory-component';
import Columns from '../columns';
import ComponentRotator from '../component-rotater';
import AnnouncementCard from '../announcement-card';

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

                <Panel id="date-panel">
                    <CurrentDate lang={lang}/>
                </Panel>

                <EventsCard lang={lang}/>

                <ComponentRotator interval={10000}>
                    <div key="Group1">
                        <DeviceCard lang={lang}/>
                        <WeatherCard lang={lang}/>
                    </div>
                    <AnnouncementCard key="Group2"/>
                </ComponentRotator>

                <STMCard lang={lang}/>
                <BixiCard lang={lang} />
                <SponsorsPanel lang={lang}/>

            </div>
        );
    }

}
