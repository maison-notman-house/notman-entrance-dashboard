import React from 'react';

import Panel from './panel';
import LogoHeader from './logo-header';
import EventsCard from './events-card';
import WeatherCard from './weather-card';
import DeviceCard from './device-card';
import SponsorsPanel from './sponsors-panel';
import CurrentDate from './current-date';
import STMCard from './stm-card';
import DirectoryCard from './directory-component';
import Columns from './columns';

import BodyClass from './body-class';

const LANGUAGES = ['en', 'fr'];

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        var location = props.location.query.location;
        if (!location) {
            location = 'entrance';
        }

        this.state = {
            location: location,
            language: LANGUAGES[1]
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
        var lang = this.state.language;

        if (this.state.location === 'campus-1') {
            BodyClass.addClassToBody('landscape campus-1');
            return this.renderFloorView('Campus - Floor 1', 1, 'campus', lang);
        } else if (this.state.location === 'campus-2') {
            BodyClass.addClassToBody('landscape campus-2');
            return this.renderFloorView('Campus - Floor 2', 2, 'campus', lang);
        } else {
            BodyClass.addClassToBody('portrait entrance');

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
}
