import React from 'react';
import Buspanel from './buspanel';

const BUSSTOPS = [
  { 
    "key":24,
    "busline": 24,
    "direction1":{
        "direction": "E",
        'busStopCode': 52510
        },
    "direction2": {
        "direction": "W",
        'busStopCode' : 52509
    } 
  },
  { 
    "key":55,
    "busline": 55,
    "direction1":{
        "direction": "N",
        'busStopCode' : 52511
    },
    "direction2": {
        "direction": "S",
        'busStopCode' : 52486
    }
  },
  { 
    "key":125,
    "busline": 125,
    "direction1":{
        "direction": "E",
        'busStopCode' : 52612
    },
    "direction2": {
        "direction": "W",
        'busStopCode' : 52611
    }
  }
  ];

export default class STMCard extends React.Component {

  constructor() {
      super();
    };

	render(){
  	return (
      <div className = "Card stm-card">
        <img id="stm-logo" src="images/logos/stm.png" />
        <div className="bus-card-title" > Your next bus </div>
        <div className= " buspanel-container">
          {
            BUSSTOPS.map( (bus) => {
            return <Buspanel businfo={bus} key={bus.key} />
            })
          }
        </div>
			</div>
    )
  }
}
