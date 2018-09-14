const cachedResponses = {};
const maxAge = 10 * 60 * 1000;
const id = '6077243';
const appid = 'dc252e41ccdd53d06d044cde8f15dedb';

function getCachedValue(name, updateInterval=maxAge) {
    // handle maxAge of cached value
    if (cachedResponses[name]) {
        if (new Date().getTime() - cachedResponses[name].createdAt >= updateInterval) {
            cachedResponses[name] = undefined;
        } else {
            return cachedResponses[name].value;
        }
    }
}

function setCachedValue(name, value) {
    cachedResponses[name] = {
        value: value,
        createdAt: new Date()
    };
}

function getCurrentWeather(lang, updateInterval) {    
    const currentWeather = getCachedValue(`currentWeather-${lang}`, updateInterval);
    if (currentWeather) {
        return Promise.resolve(currentWeather);
    } else {
        console.log('Refreshing current weather', lang);
        return fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${appid}&units=metric&lang=${lang}`)
            .then(response => response.json())
            .then(newCurrentWeather => {
                setCachedValue(`currentWeather-${lang}`, newCurrentWeather);
                return newCurrentWeather;
            });
    }
}

function getForecastWeather(lang, updateInterval) {
    const forecastWeather = getCachedValue(`forecastWeather-${lang}`, updateInterval);
    if (forecastWeather) {
        return Promise.resolve(forecastWeather);
    } else {
        console.log('Refreshing forecast weather', lang);
        return fetch(
            `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${appid}&units=metric&lang=${lang}`)
            .then(response => response.json())
            .then(newForecastWeather => {
                setCachedValue(`forecastWeather-${lang}`, newForecastWeather);
                return newForecastWeather;
            });            
    }
}

export {getCurrentWeather, getForecastWeather};