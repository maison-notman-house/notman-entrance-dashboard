import React from 'react';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        'theres': 'There are',
        'bikes': ' Bixi bicycle',
        'available': ' available at Milton/Clark'
    },
    fr: {
        'theres': 'Il y a',
        'bikes': 'vélo',
        'available': ' Bixi disponible à Milton/Clark'
    }
});

export default class BixiCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //data: [],
            bikesAvailable: 0,
        };
        this.updateBixi = this.updateBixi.bind(this);
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
            res.stations.filter(function(station){
                // milton/clark station 6209
                return station.n === "6209";
            }).forEach(function(station){
                // set state of bikes available
                scope.setState({bikesAvailable: station.ba});
            });
        }).catch(err => {
            scope.setState({
                bikesAvailable: -1
            });
            console.log('Bixi error '+err);
        });
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
            message = `${bikesAvailable} ${strings.bikes}${bikesAvailable === 1?'':'s'} ${strings.available}`;
        } else {
            message = 'Unable to get bike availabilty';
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
}