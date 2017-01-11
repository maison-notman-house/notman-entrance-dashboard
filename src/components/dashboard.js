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
import TwitterCard from './twitter-card';

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

    renderFloorView(location, floor, building, lang) {
        return (
            <div lang={lang}>

                <LogoHeader/>

                <Columns>
                    <div className="screenLeft">
                        <DirectoryCard
                            lang={lang}
                            location={location}
                            floor={floor}
                            building={building}/>
                    </div>
                    <div className="screenRight">
                        <DeviceCard lang={lang}/>
                        <TwitterCard height="500"/>
                    </div>
                </Columns>
            </div>
        );
    }

    render() {        
        var lang = this.state.lang;

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
