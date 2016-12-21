import React from 'react';

import Panel from './panel';
import LogoHeader from './logo-header';
import EventsCard from './events-card';
import WeatherCard from './weather-card';
import DeviceCard from './device-card';
import SponsorsPanel from './sponsors-panel';
import CurrentDate from './current-date';
import STMCard from './stm-card';
import HolidayEventsCard from './holiday-events';
import DirectoryCard from './directory-component';
import Columns from './columns';

import BodyClass from './body-class';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        var location = props.location.query.location;
        if (!location) {
            location = 'entrance';
        }

        this.state = {
            location: location
        };
    }

    renderFloorView(location, floor, building, lang) {
        return (
            <div lang={lang}>

                <LogoHeader/>

                <Columns>
                    <div className="screenLeft">
                        <DirectoryCard
                            lang={this.state.lang}
                            location={location}
                            floor={floor}
                            building={building}/>
                    </div>
                    <div className="screenRight">
                        <DeviceCard lang={this.state.lang}/>
                        <WeatherCard lang={this.state.lang}/>
                    </div>
                </Columns>
            </div>
        );
    }

    render() {
        var lang = 'en';

        if (this.state.location === 'campus-1') {
            BodyClass.addClassToBody('landscape campus-1');
            return this.renderFloorView('Campus - Floor 1', 1, 'campus', this.state.lang);
        } else if (this.state.location === 'campus-2') {
            BodyClass.addClassToBody('landscape campus-2');
            return this.renderFloorView('Campus - Floor 2', 2, 'campus', this.state.lang);
        } else {
            BodyClass.addClassToBody('portrait entrance');

            return (
                <div lang={lang}>

                    <LogoHeader/>

                    <Panel>
                        <CurrentDate/>
                    </Panel>

                    <HolidayEventsCard/>

                    <DeviceCard/>
                    <WeatherCard/>

                    <STMCard/>
                    <SponsorsPanel/>

                </div>
            );
        }
    }
}
