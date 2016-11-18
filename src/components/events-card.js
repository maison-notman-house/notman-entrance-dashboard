import React from 'react';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en:{
    'cafe': 'osmo café',
     'big room': 'big room',
     'glass door room': 'glass door',
     'glass door': 'glass door',
     'both rooms': 'both rooms',
     'Today': 'Today',
     'Tomorrow': 'Tomorrow',
     'Monday': 'Monday',
     'Tuesday': 'Tuesday',
     'Wednesday': 'Wednesday',
     'Thursday': 'Thursday',
     'Friday': 'Friday',
     'Saturday': 'Saturday',
     'Sunday':'Sunday'
  },
  fr: {
    'cafe': 'café osmo',
    'big room': 'grande salle',
    'glass door room': 'porte en verre',
    'glass door': 'porte en verre',
    'both rooms': 'les 2 salles',
    'Today': "Aujourd'hui",
     'Tomorrow': 'Demain',
     'Monday': 'Lundi',
     'Tuesday': 'Mardi',
     'Wednesday': 'Mercredi',
     'Thursday': 'Jeudi',
     'Friday': 'Vendredi',
    'Saturday': 'Samedi',
     'Sunday':'Dimanche'
  }
})

export default class EventsCardComponent extends React.Component {

  updateEventsData() {

    var scope = this;
    var data = fetch(this.fetchUrl).then(response => response.json()).then(function (data) {
      return data;
    }).then(function (data) {
      scope.setState({
        events: data
      });
    });

  }

  locationForDisplay(room) {
    const locationMap = {
      'cafe': strings.cafe,
      'big room': strings['big room'],
      'glass door room': strings['glass door'],
      'glass door': strings['glass door'],
      'both rooms':strings['both rooms']
    };
    if (locationMap[room]) {
      return locationMap[room];
    }

    return room;
  }

  createDay(e) {
    var scope = this;

    let items = e.items.map((e, idx) => {
      return <div className="event" key={e.date + '-' + idx}><span className={"roomlabel " + e.tags.join(', ').replace(' ', '') } >{this.locationForDisplay(e.tags.join(', ')) }</span> <span className="eventtime">{e.start}</span> <span className="eventname">{e.title}</span></div>;
    });

    return <div className="EventsCard-day" key={e.date}>
      <div className="EventsCard-day-name">
        {strings[e.day]} 
      </div>

      {items}
    </div>;
  }

  componentWillMount() {
    this.refreshIntervalMinutes = 15;
    this.fetchUrl = 'https://notman.herokuapp.com/api/events?24hour=1';
    this.updateEventsData();
  }


  componentDidMount() {
    window.setInterval(function () {
      this.updateEventsData();
    }.bind(this), (this.refreshIntervalMinutes * 60 * 1000));
  }

  componentWillReceiveProps(nextProps) {
    strings.setLanguage(nextProps.lang);
    this.setState({})
  } 

  render() {

    let events = [];
    if (this.state && this.state.events) {
      events = this.state.events;
    }

    return <div className="EventsCard Card">
      {events.map(e => { return this.createDay(e) }) }
    </div>;
  }

}