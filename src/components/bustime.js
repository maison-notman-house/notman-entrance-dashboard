import React from 'react';
import fetchJsonp from 'fetch-jsonp';
import Moment from 'moment';

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

  render(){

    var direction = "";
    switch(this.state.direction){
      case "N":
        direction = "North";
        break;
      case "S":
        direction = "South";
        break;
      case "E":
        direction = "East ";
        break;
      case "W":
        direction = "West";
        break;
    };

    var busTimes = this.state.nextBusTime.join(" \u2022 ");

    if (!this.state.minutesVsHours){
    		return (
    			<div> 
    				{direction}: <span className='bustime'> {busTimes}</span>
    			</div>
    		)
    } else {
      return (
          <div> 
            {direction}: <span className='bustime'>in <span className="busMinutes">{this.state.minutesToBus[0]}</span> and <span className="busMinutes">{this.state.minutesToBus[1]}</span> minutes</span>
          </div>
        )
    } 
  }
}