import React from 'react';
import fetchJsonp from 'fetch-jsonp';
import Moment from 'moment';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en:{
    north: 'North',
    south: 'South',
    east: 'East ',
    west: 'West',
    in: 'in',
  },
  fr: {
    north: 'Nord',
    south: 'Sud',
    east: 'Est ',
    west: 'Ouest',
    in: '',
  }
})

export default class Bustime extends React.Component {

	constructor() {
	  super();
	  this.state = { 
      minutesVsHours: false
	  }
	}

	getNextBusTime() {
    var scope = this;
    var dateToday = Moment().format('YYYYMMDD');

    var fetchUrl = 'https://i-www.stm.info/fr/lines/' + scope.state.busline 
    +'/stops/'+ scope.state.busStopCode +'/arrivals.json?callback=&d='+ dateToday
    +'&direction=' + scope.state.direction +'&wheelchair=0&_=1411829351069';
  //  console.log(fetchUrl);
    var data = fetchJsonp(fetchUrl).then(response => response.json())
    .then( (data)  => data).then((data) => {
      
      //make an array with all bus times for the day
      var allBusTimes = [];
      data.result.forEach( function(obj){
          allBusTimes.push(obj.time);
      })    

      // calculate and display the next 2 buses as of now
      var nextBusTime = scope.calculateNextBusFromNow(allBusTimes);
      var minutesToBus = scope.calculateMinutesToBus(nextBusTime);

      scope.setState({
        nextBusTime: nextBusTime,
        minutesToBus: minutesToBus
      })

    })
  }

  calculateNextBusFromNow(busTimes){
    var timeNow = Moment().locale('en').add(1, 'm').format("HHmm");

    for (var i=0; i<busTimes.length; i++) {    
      if (parseInt(busTimes[i]) > parseInt(timeNow)) {
      	// returns the time of the next two buses after the current time (can give an error at the end of the day)
        return [Moment(busTimes[i], "HH:mm" ).format("HH:mm"), Moment(busTimes[i+1], "HH:mm" ).format("HH:mm")]
      }
    } 
  }
     


  calculateMinutesToBus(busTimes){
    var minutes = []
    busTimes.forEach( function(busTime){
      var TimeofBus = Moment(busTime, "HHmm");
      var now = Moment(Moment().locale('en').format("HHmm"), 'HHmm');

      minutes.push(TimeofBus.diff(now, 'minutes'));
    })
    return minutes;
  } 

  componentWillMount() {
		this.setState({
			busline: this.props.businfo.busline,
		  direction: this.props.businfo.direction,
		  busStopCode: this.props.businfo.busStopCode,
		  nextBusTime: [],
      minutesToBus: []

		})
	}

  componentDidMount(){
    this.getNextBusTime();

    window.setInterval(function () {
      this.getNextBusTime();
      this.setState({
        minutesVsHours:!this.state.minutesVsHours
      })
    }.bind(this), 10000);
  }

  componentWillReceiveProps(nextProps) {
    strings.setLanguage(nextProps.lang);
    this.setState({})
  }

  render(){

    var direction = "";
    switch(this.state.direction){
      case "N":
        direction = strings.north;
        break;
      case "S":
        direction = strings.south;
        break;
      case "E":
        direction = strings.east;
        break;
      case "W":
        direction = strings.west;
        break;
    };

    var busTimes = this.state.nextBusTime.join(" \u2022 ");

    if (!this.state.minutesVsHours){
    		return (
    			<div className="bustime"> 
    				{direction}: {busTimes}
    			</div>
    		)
    } else {
      return (
          <div className="bustime"> 
            {direction}: {strings.in}<span className="busMinutes"> {this.state.minutesToBus[0]}</span> & <span className="busMinutes">{this.state.minutesToBus[1]}</span> min
          </div>
        )
    } 
  }
}