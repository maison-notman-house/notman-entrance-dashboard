import React from 'react';

import Panel from '../panel';
import LogoHeader from '../logo-header';
import EventsCard from '../events-card';
import WeatherCard from '../weather-card';
// import DeviceCard from '../device-card';
import SponsorsPanel from '../sponsors-panel';
import CurrentDate from '../current-date';
// import BixiCard from '../bixicard';
// import ComponentRotator from '../component-rotater';
import AnnouncementCard from '../announcement-card';

export default function render({lang='en'}) {
    return (
        <div lang={lang}>

            <LogoHeader lang={lang} screenId="cafe-entrance"/>

            <Panel id="date-panel">
                <CurrentDate lang={lang}/>
            </Panel>

            <EventsCard lang={lang}/>
            
            <AnnouncementCard key="Group2" lang={lang}/>

            <WeatherCard lang={lang}/>

            <SponsorsPanel lang={lang}/>

        </div>
    );
}
