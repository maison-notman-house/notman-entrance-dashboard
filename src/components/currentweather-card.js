import React from 'react';

export default class CurrentWeatherCardComponent extends React.Component {

    updateWeatherData() {
        var scope = this;
        fetch(this.fetchUrl)
            .then(response => response.json())
            .then(function (data) {
                scope.setState({data: data});
            });
    }

    displayData(data) {
        var imageUri = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        var imageDesc = data.weather[0].description;
        var temp = Math.round(data.main.temp);

        return <div className="WeatherCard-day">
            <div className="WeatherCard-day-name">
                <div className="weatherImg"><img alt={imageDesc} src={imageUri}/></div>
                <span className="temperature">
                    <b>{temp}</b>
                </span>&#8451;
                <span className="humidity">
                    (Humidity:
                    <b>{data.main.humidity}%</b>)
                </span>, &nbsp;
                <span className="conditionLabel">{data.weather[0].description}</span>
            </div>
        </div>;
    }

    componentWillMount() {
        this.fetchUrl = 'http://api.openweathermap.org/data/2.5/weather?id=6077243&APPID=dc252e41ccdd53d0' +
                '6d044cde8f15dedb&units=metric&lang=en';
        this.updateWeatherData();
        this.refreshIntervalMinutes = 15;
    }

    componentDidMount() {
        window
            .setInterval(function () {
                this.updateWeatherData();
            }.bind(this), (this.refreshIntervalMinutes * 60 * 1000)); // referesh every 15 min
    }

    render() {
        var cityName = 'N/A';
        var cityData = 'No data!';

        if (this.state && this.state.data) {
            cityName = this.state.data.name;
            cityData = this.displayData(this.state.data);
        }

        return <div className="WeatherCard Card">
            <h3>{cityName}
                (Current)
            </h3>
            {cityData}
        </div>;
    }

}