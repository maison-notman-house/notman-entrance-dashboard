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
            ba: 0,
        };
        this.updateBixi = this.updateBixi.bind(this);
    }

    updateBixi() {
        fetch('https://secure.bixi.com/data/stations.json')
        .then(res => res.json())
        .then(res => {
            //this.setState({data: res.stations});
            res.stations.filter(function(station){
                // milton/clark station 6209
                return station.n === "6209";
            }).map(function(station){
                // set state of bikes available
                this.setState({ba: station.ba});
               // console.log('Bixi at', Date.now(), this.state.ba)
            }, this);
        }).catch(err => {
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
        return(
            <div className='Card '>
                <img id='bixi-logo' src='images/logos/Bixi_logo.svg.png' alt='Bixi'/>
                <div className='bixi-text'>
                {this.state.ba} {strings.bikes}{this.state.ba === 1?'':'s'} {strings.available}
                </div>
            </div>
        );
    }
}