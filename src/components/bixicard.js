import React from 'react';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        'theres': 'There are',
        'available': 'Bixi bikes available'
    },
    fr: {
        'theres': 'Il y a',
        'available': 'vélo Bixi disponible'

    }
});

export default class BixiCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null
        };
    }

    updateBixi() {
        fetch('https://secure.bixi.com/data/stations.json')
        .then(res => res.json())
        .then(res => {
            this.setState({data: res.stations});
            console.log('Bixi data '+this.state.data[6]);
        }).catch(err => {
            this.setState({error: err});
            console.log('Bixi error'+this.state.error);
        });
    }

    componentWillMount() {
        this.updateBixi();
    }

    componentWillReceiveProps(nextProps) {
        strings.setLanguage(nextProps.lang);
        this.setState({});
    }

    render(){
        return(
            <div className='Card '>
              {strings.theres} {strings.available}
              
            </div>
        );
    }
}