const axios = require('axios');

const TOKEN_WEATHER_API = process.env.TOKEN_WEATHER_API;

const fetchAdditionalFullInfo = async cityName => {
    try {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${TOKEN_WEATHER_API}`
        );

        const { wind, weather, sys, main, visibility, clouds, dt } = data;

        const { pressure, temp, feels_like, temp_min, temp_max, sea_level, humidity, grnd_level } =
            main;

        const { speed, deg, gust } = wind;

        const { sunrise, sunset } = sys;

        const fullWeatherInfo = `
    
🌡 Temperature: ${Math.round(temp)}℃
🌡 Feels like temp: ${Math.round(feels_like)}℃
💧 Humidity: ${humidity}%
💨 Wind: ${speed}m/s
↘ Pressure: ${pressure}hPa
☁️ Clouds: ${clouds.all}%
💨 Wind degree: ${deg}°
💨 Wind gust: ${gust} m/s
👀 Visibility: ${visibility} meters
🥶 Min temperature: ${Math.round(temp_min)}℃
🥵 Max temperature: ${Math.round(temp_max)}℃
🌊 Sea level pressure: ${sea_level}hPa
⛰ Ground level pressure:${grnd_level}hPa
🌦 Sky: ${weather[0].description}
🌅 Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString()}
🌇 Sunset: ${new Date(sunset * 1000).toLocaleTimeString()}

                `;

        return fullWeatherInfo;
    } catch (error) {
        console.log('error.message', error.message);
    }
};

module.exports = fetchAdditionalFullInfo;
