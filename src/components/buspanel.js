import React from 'react';
import Bustime from './bustime';

export default class Buspanel extends React.Component {

	render() {
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
			<div className="buspanel"> 
				<div className='busline'> Bus {bus.busline} </div>
				<Bustime businfo={bus1} lang={this.props.lang} />
				<Bustime businfo={bus2} lang={this.props.lang}/>
			</div>
		)
	}
}