import React from 'react';

export default function WeatherCard({weatherData}) {
    var cityName ='N/A';
    var cityData = 'No data!';

    if (typeof weatherData !== 'undefined') {
        cityName = weatherData.city.name + ' (5 day / 3 hour forecast data)';
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
    var date = formatDate(new Date(data.dt * 1000));

    return  <div className="WeatherCard-day">
                <div className="WeatherCard-day-name">
                    <img alt={imageDesc} src={imageUri} />
                    Datetime: {date}, Humidity: {data.main.humidity}%, Tempeture: {data.main.temp}&#8451;
                </div>
            </div>;
}

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;

    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}