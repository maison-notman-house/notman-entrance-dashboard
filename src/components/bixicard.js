import React from 'react';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        'theres': 'There are',
        'bikes': ' Bixi bicycle',
        'available': ' at '
    },
    fr: {
        'theres': 'Il y a',
        'bikes': 'vélo',
        'available': ' Bixi à '
    }
});

// milton/clark station 6209
// clark/evans station 6003
// Ste-Famille/Sherbrooke 6202
let stationList = ["6209", "6003", "6202"];

export default class BixiCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stationData: [],
            bikesAvailable: 0,
            station: '',
            cycleCount: 0,
        };
        this.updateBixi = this.updateBixi.bind(this);
        //this.cycleBixi = this.cycleBixi.bind(this);
    }

    updateBixi() {
        const scope = this;
        fetch('https://secure.bixi.com/data/stations.json')
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then(res => {
            let stationArray = [];
            res.stations.filter(function(station){
                return stationList.indexOf(station.n) > -1;
            }).forEach(function(station){
                stationArray.push(station);
            });
            scope.setState({stationData: stationArray});
            return;
        })
        .then( () => {
            clearInterval(cycleInterval);
            this.cycleBixi();
            let cycleInterval = window.setInterval(function(){
                this.cycleBixi();
            }.bind(this), 20000);
        }).catch(err => {
            scope.setState({
                bikesAvailable: -1
            });
            console.log('Bixi error '+err);
        });
    }

    cycleBixi() {
        let cycleCount = this.state.cycleCount;
        let stationData = this.state.stationData;
        if (cycleCount+1 < stationData.length){
            ++cycleCount;
        } else {
            cycleCount = 0;
        }
        this.setState({
            cycleCount: cycleCount,
            bikesAvailable: this.state.stationData[cycleCount].ba,
            station: this.state.stationData[cycleCount].s});
    }

    componentWillMount() {
        this.updateBixi();
    }

    componentDidMount() {
        window.setInterval(function(){
            this.updateBixi();
        }.bind(this), 60000);
    }

    componentWillReceiveProps(nextProps) {
        strings.setLanguage(nextProps.lang);
        this.setState({});
    }

    render(){
        const {bikesAvailable} = this.state;
        let message = '';

        if (bikesAvailable > -1) {
            message = `${bikesAvailable} ${strings.bikes}${bikesAvailable === 1?'':'s'} ${strings.available}${this.state.station}`;
        } else {
            message = 'Unable to get bike availabilty';
            console.log('unavailable');
        }

        return(
            <div className='Card ' id='bixi-card'>
                <img className='logo' src='images/logos/Bixi_logo.svg.png' alt='Bixi'/>
                <div className='text'>
                {message}
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.clearInterval(this.interval);
    }
}