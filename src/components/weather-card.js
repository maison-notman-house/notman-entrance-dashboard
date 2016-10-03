import React from 'react';
import moment from 'moment';

const MINUTE = 60000;
const PRECIPITATION_TYPES = new Set(['Rain', 'Snow', 'Thunderstorm', 'Drizzle']);

export default class ForecastWeatherCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
    
  componentDidMount() {
    this.updateWeatherData();
    setInterval(this.updateWeatherData.bind(this), 60 * MINUTE);
  }
    
  updateWeatherData() {
    var currentWeatherResponse;
    fetch('http://api.openweathermap.org/data/2.5/weather?id=6077243&APPID=dc252e41ccdd53d06d044cde8f15dedb&units=metric&lang=en')
    .then(response => response.json())
    .then(jsonResponse => {
      currentWeatherResponse = jsonResponse;
    }).then(() => {
      return fetch('http://api.openweathermap.org/data/2.5/forecast?id=6077243&units=metric&appid=dc252e41ccdd53d06d044cde8f15dedb')
    }).then(response => response.json())
    .then(jsonResponse => {
      this.setState({
        currentWeather: currentWeatherResponse,
        forecastWeather: jsonResponse
      });
    });
  }
  
  render() {
    if (!this.state.currentWeather) return null;
    
    const currentCondition = this.state.currentWeather.weather[0].main;
    console.log('Current condition is ', currentCondition, this.state.currentWeather);
    const isCurrentPrecipitation = PRECIPITATION_TYPES.has(currentCondition);
    const currentConditionDisplay = <span>{currentCondition} right now. </span>;
    const precipitations = findPrecipitations(currentCondition, this.state.forecastWeather.list);
    
    let precipitationDisplay;
    if (precipitations.length) {
      precipitationDisplay = precipitations.map(precipitation => {
        return <span>{precipitation.weather[0].main} in the next {moment(precipitation.dt_txt).fromNow(false)}. </span>;
      });
    } else if (!isCurrentPrecipitation) {
      precipitationDisplay = <span>No precipitation expected.</span>;
    }
    
    return  <div className="Card WeatherCard">
      <span className="WeatherCard-title">Weather</span> {currentConditionDisplay}
      {precipitationDisplay}
    </div>;
    
  }
}


function findPrecipitations(currentCondition, weatherPoints) {
  const seenPrecipitations = new Set();
  var result = [];
  weatherPoints.forEach(weatherPoint => {
    const condition = weatherPoint.weather[0].main;
    if (currentCondition != condition && PRECIPITATION_TYPES.has(condition) && !seenPrecipitations.has(condition)) {
      seenPrecipitations.add(condition);
      result.push(weatherPoint);
    }
  });
  return result;
}
