import React from 'react';
import Moment from 'moment';

export default function ForecastWeatherCard({weatherData}) {
    var cityName ='N/A';
    var cityData = 'No data!';

    if (typeof weatherData !== 'undefined') {
        cityName = weatherData.city.name;
        cityData = weatherData.list.splice(0,3).map(displayData);
    }

    return  <div className="ForecastWeatherCard Card">
                <h3>{cityName} (Forecast)</h3>
                {cityData}
            </div>;
}

function displayData(data) {
    var imageUri = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    var imageDesc = data.weather[0].description;
    var date = Moment(data.dt_txt).locale('en').calendar();
    var temp = Math.round(data.main.temp);

    return  <div className="WeatherCard-day" key={data.dt}>
                <div className="WeatherCard-day-name">
                    <div className="weatherImg"><img alt={imageDesc} src={imageUri} /></div>
                    <span className="date">{date}</span>:
                    <span className="temperature"> <b>{temp}</b></span>&#8451;
                    <span className="humidity"> (Humidity: <b>{data.main.humidity}%</b>)</span>,&nbsp;
                    <span className="conditionLabel">{data.weather[0].description}</span>
                </div>
            </div>;
}