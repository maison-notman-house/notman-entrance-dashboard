import React from 'react';
import Moment from 'moment';

export default function CurrentWeatherCard({weatherData}) {
    var cityName ='N/A';
    var cityData = 'No data!';

    if (typeof weatherData !== 'undefined') {
        console.log(weatherData);
        cityName = weatherData.name;
        cityData = displayData(weatherData);
    }

    return  <div className="WeatherCard Card">
                <h3>{cityName} (Current)</h3>
                {cityData}
            </div>;
}

function displayData(data) {
    var imageUri = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    var imageDesc = data.weather[0].description;
    var date = Moment(data.dt_txt).lang("en").fromNow(false);
    var temp = Math.round(data.main.temp);

    return  <div className="WeatherCard-day">
                <div className="WeatherCard-day-name">
                    <div className="weatherImg"><img alt={imageDesc} src={imageUri} /></div>
                    <span className="temperature"> <b>{temp}</b></span>&#8451;
                    <span className="humidity"> (Humidity: <b>{data.main.humidity}%</b>)</span>,&nbsp;
                    <span className="conditionLabel">{data.weather[0].description}</span>

                </div>
            </div>;
}