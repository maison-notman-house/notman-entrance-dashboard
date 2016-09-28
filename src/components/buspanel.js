import React from 'react';
import Bustime from './bustime';

export default class Buspanel extends React.Component {

	constructor() {
    super();
	}

	render(){
		var bus = this.props.businfo;
		var bus1 = {
			busline: bus.busline,
			direction: bus.direction1.direction,
			busStopCode:bus.direction1.busStopCode
		}
		var bus2 = {
			busline: bus.busline,
			direction: bus.direction2.direction,
			busStopCode:bus.direction2.busStopCode
		}

		return (
			<div className = "buspanel"> 
				<div className='busline'> Line {bus.busline} </div>
				<Bustime businfo = {bus1} />
				<Bustime businfo = {bus2} />
			</div>
		)
	}
}