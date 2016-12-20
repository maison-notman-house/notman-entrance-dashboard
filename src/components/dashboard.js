import React from 'react';

import EventsCard from './events-card';
import WeatherCard from './weather-card';
import DeviceCard from './device-card';
import SponsorsCard from './sponsors-card';
import Columns from './columns';
import CurrentDate from './current-date';
import STMCard from './stm-card';

import Card from './card';
import Banner from './banner';
import DateBanner from './date-banner';
import DirectoryCard from './directory-component';

function TitleLine({children}) {
    return <div style={{
        lineHeight: '60px',
        fontSize: '60px'
    }}>{children}</div>;
}

function TextLine({children}) {
    return <div style={{
        lineHeight: '60px',
        fontSize: '20px'
    }}>{children}</div>;
}

class CardCycler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    componentDidUpdate() {
        this
            .refs
            .wrapper
            .classList
            .remove('CardCycler--transitionOut');
        this
            .refs
            .wrapper
            .classList
            .remove('CardCycler--transitionIn');
    }

    componentDidMount() {
        this.timer = setInterval(this.onInterval, 9000);

        this
            .refs
            .wrapper
            .classList
            .remove('CardCycler--transitionIn');
    }

    onInterval = () => {
        let index = (this.state.index + 1) % React
            .Children
            .toArray(this.props.children)
            .length;

        this
            .refs
            .wrapper
            .classList
            .add('CardCycler--transitionOut');
        setTimeout(() => {
            this.setState({index});
        }, 500);
    }

    // animateCardIn() {   this.refs.wrapper.classList.add('Card--transitionIn');
    // this.setTimeout(() =>
    // this.refs.wrapper.classList.remove('Card--transitionIn')); } animateCardOut()
    // {   this.refs.wrapper.classList.add('Card--transitionOut');
    // this.setTimeout(() =>
    // this.refs.wrapper.classList.remove('Card--transitionOut')); }

    render() {
        const child = React
            .Children
            .toArray(this.props.children)[this.state.index];
        console.log(child);

        console.log('Entering');

        const delay = 0;

        // setTimeout(() => { }, 500 + delay);

        return (
            <div ref="wrapper" className="CardCycler CardCycler--transitionIn">
                {child}
            </div>
        );
    }
}

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
            lang: 'en',
            location: location
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
            <div lang={lang} className="landscape">
                <DateBanner lang={this.state.lang}/>
                <Columns>
                    <div className="screenLeft">
                        <DirectoryCard lang={this.state.lang} location={location} floor={floor} building={building}/>
                    </div>
                    <div className="screenRight">
                        <EventsCard lang={this.state.lang}/>
                        <WeatherCard lang={this.state.lang}/>
                    </div>
                </Columns>
            </div>
        );        
    }
    render() {
        var lang = 'en';

        if (this.state.location === 'campus-1') {
            return this.renderFloorView(
                this.state.location,
                1,
                'campus',
                this.state.lang
            );
        } else if (this.state.location === 'campus-2') {
            return this.renderFloorView(
                this.state.location,
                2,
                'campus',
                this.state.lang
            );
        } else {
            return (
                <div lang={lang} className="portrait">
                    <DateBanner lang={this.state.lang}/>
                    <EventsCard lang={this.state.lang}/>
                    <DeviceCard lang={this.state.lang}/>
                    <WeatherCard lang={this.state.lang}/>
                    <STMCard lang={this.state.lang}/>
                    <SponsorsCard/>
                </div>
            );
        } 
    }
}
