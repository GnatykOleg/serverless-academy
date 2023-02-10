const axios = require('axios');
const tokeWeatherApi = 'ccdba0fdccc76deb1453540c87a0500d';

const fetchWeatherData = async (cityName, info) => {
    try {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${tokeWeatherApi}`
        );

        const {
            main: { pressure, temp, feels_like },
            dt_txt,
            clouds,
            wind,
        } = data.list[0];

        if (info === 'full') {
            return `
🌡 Temperature: ${Math.round(temp)}℃ 

🌡 Feels like temp: ${Math.round(feels_like)}℃ 

☁ Clouds: ${clouds.all}% 

 ↘ Pressure: ${pressure}mmHg  

 📅 : ${dt_txt} `;
        }

        return `🍃 Wind: ${wind.speed}km/h `;
    } catch (error) {
        console.log('error.message', error.message);
    }
};

module.exports = fetchWeatherData;