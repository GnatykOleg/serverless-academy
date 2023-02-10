const axios = require('axios');
const tokeWeatherApi = 'ccdba0fdccc76deb1453540c87a0500d';

const fetchWeatherData = async (cityName, info) => {
    try {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=1&units=metric&appid=${tokeWeatherApi}`
        );

        const { main, dt_txt, clouds, wind, weather } = data.list[0];

        const { sunrise, sunset } = data.city;

        const { pressure, temp, feels_like, temp_min, temp_max, sea_level } = main;

        const fullWeatherInfo = `
🌡 Temperature: ${Math.round(temp)}℃ 

🌡 Feels like temp: ${Math.round(feels_like)}℃ 

🥶 Min temperature: ${Math.round(temp_min)}℃ 

🥵 Max temperature: ${Math.round(temp_max)}℃ 

🌊 Sea level: ${sea_level}

☁️ Clouds: ${clouds.all}% 

 ↘ Pressure: ${pressure}mmHg  

 🌦 Sky: ${weather[0].description}

 🌅 Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString()}

 🌇 Sunset: ${new Date(sunset * 1000).toLocaleTimeString()}

 📅 The summary is up-to-date on : ${dt_txt} `;

        return info === 'full' ? fullWeatherInfo : `💨 Wind: ${wind.speed}km/h `;
    } catch (error) {
        console.log('error.message', error.message);
    }
};

module.exports = fetchWeatherData;
