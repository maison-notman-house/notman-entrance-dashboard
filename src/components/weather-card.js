import React from 'react';
import Moment from 'moment';

export default function WeatherCard({weatherData}) {
    var cityName ='N/A';
    var cityData = 'No data!';

    if (typeof weatherData !== 'undefined') {
        cityName = weatherData.city.name;
        cityData = weatherData.list.map(displayData);
    }

    return  <div className="WeatherCard Card">
                <h3>{cityName}</h3>
                {cityData}
            </div>;
}

function displayData(data) {
    var imageUri = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    var imageDesc = data.weather[0].description;
    var date = Moment(data.dt_txt).calendar();
    var temp = Math.round(data.main.temp);

    return  <div className="WeatherCard-day">
                <div className="WeatherCard-day-name">
                    <div className="weatherImg"><img alt={imageDesc} src={imageUri} /></div>
                    <span className="date">{date}</span>,
                    <span className="humidity"> Humidity: <b>{data.main.humidity}%</b></span>,
                    <span className="temperature"> Temperature: <b>{temp}</b></span>&#8451;
                </div>
            </div>;
}