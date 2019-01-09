import React from 'react';
import moment from 'moment';
import LocalizedStrings from 'react-localization';
import {getCurrentWeather, getForecastWeather} from './weather-utils';
import WeatherIcon from 'react-icons-weather';

let strings = new LocalizedStrings({
    en: {
        title: 'Weather',
        now: 'Now',
        next: 'in',
        noPrecipitation: 'No precipitation expected.',
        Rain: 'Rain',
        Snow: 'Snow',
        Thunderstorm: 'Thunderstorm',
        Drizzle: 'Drizzle',
        'feels like': 'Feels like'
    },
    fr: {
        title: 'Meteo',
        now: 'Actuellement',
        next: 'dans',
        noPrecipitation: 'Aucune précipitation prévue.',
        Rain: 'Pluie',
        Snow: 'Neige',
        Thunderstorm: 'Orage',
        Drizzle: 'Bruine',
        'feels like': 'Ressenti'
    }
});

import Card from '../card';

const UPDATE_INTERVAL_MINUTES = 10 * 60 * 1000;
const PRECIPITATION_TYPES = new Set(['Rain', 'Snow', 'Thunderstorm', 'Drizzle']);

export default class ForecastWeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: props.lang
        };

        strings.setLanguage(props.lang);                
    }

    componentDidMount() {
        this.updateWeatherData('en');
    }

    componentWillReceiveProps(nextProps) {
        strings.setLanguage(nextProps.lang);
        this.updateWeatherData(nextProps.lang);
        this.setState({});
    }

    updateWeatherData(lang) {
        var currentWeather;

        getCurrentWeather(lang, UPDATE_INTERVAL_MINUTES)
            .then(weather => {
                currentWeather = weather;
            })
            .then(() => {
                return getForecastWeather(lang, UPDATE_INTERVAL_MINUTES);
            })
            .then(forecastWeather => {
                this.setState({
                    currentWeather: currentWeather,
                    forecastWeather: forecastWeather
                });
            });        
    }

    renderCurrentCondition(currentWeather) {
        let currentCondition = currentWeather.main.temp;
        currentCondition = Math.round(currentCondition) + '\u00B0';
        return <span>
            {strings.now}: {currentCondition}.
        </span>;
    }

    renderPrecipitationDisplay(precipitations, currentCondition) {
        let precipitationDisplay;
        const isCurrentPrecipitation = PRECIPITATION_TYPES.has(currentCondition);

        if (precipitations.length) {
            var idx=0;
            precipitationDisplay = precipitations.map(precipitation => {
                idx++;
                var precipitationToTranslate = precipitation.weather[0].main;
                if (strings[precipitationToTranslate]) {
                    return <span key={idx}>{strings[precipitationToTranslate]} {strings.next}&nbsp;
                        {moment(precipitation.dt_txt)
                            .locale(this.props.lang)
                            .fromNow(true)}.
                    </span>;
                } else {
                    return <span></span>;
                }
            });
        } else if (!isCurrentPrecipitation) {
            precipitationDisplay = <span>
                {strings.noPrecipitation}</span>;
        }

        return precipitationDisplay;
    }

    summerFeelsLike(weather) {
        return null;
    }

    windChill(weather) {
        const temperature = weather.main.temp;
        const windSpeed = weather.wind.speed;

        if (( windSpeed >= 6) && ( temperature > -50 ) && ( temperature <= 5)) {
            return 13.2 + (0.6215 * temperature) - (11.27 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * Math.pow(windSpeed, 0.16));
        } else {
            return temperature +((-1.59+0.1345 *temperature)/5)*windSpeed;
        }
    }

    feelsLike(weather) {
        // https://en.wikipedia.org/wiki/Apparent_temperature
        const temperature = weather.main.temp;
        if (temperature > 27) {
            return this.summerFeelsLike(weather);
        } else if (temperature < 6) {
            return this.windChill(weather);
        } else {
            return temperature;
        }
    }

    render() {
        if (!this.state.currentWeather) {
            return (
            <Card size="1.5">
               <span>Forecast unavailable</span>
            </Card>
            );
        }

        const currentWeather = this.state.currentWeather;
        let icon = '';

        if (currentWeather.weather && currentWeather.weather.length > 0) {
            const iconId = currentWeather.weather[0].id + '';
            icon = (<WeatherIcon name="owm" iconId={iconId} flip="horizontal" rotate="0" />);
        }

        const temperature = Math.round(currentWeather.main.temp);
        let feelsLike = this.feelsLike(currentWeather);
        if (feelsLike) {
            feelsLike = (<span className="feelslike">{strings['feels like']} {Math.round(feelsLike)}</span>);
        }
        
        return <Card size="1.5" className="weather">
            <div>
                {icon}                
                &nbsp;<span className="temperature">{temperature}ºC</span>
                &nbsp;{feelsLike}
            </div>
        </Card>;
    }
}

// function findPrecipitations(currentCondition, weatherPoints) {
//     const seenPrecipitations = new Set();
//     var result = [];
//     weatherPoints.forEach(weatherPoint => {
//         const condition = weatherPoint.weather[0].main;
//         if (currentCondition !== condition && PRECIPITATION_TYPES.has(condition) && !seenPrecipitations.has(condition)) {
//             seenPrecipitations.add(condition);
//             result.push(weatherPoint);
//         }
//     });
//     return result;
// }
