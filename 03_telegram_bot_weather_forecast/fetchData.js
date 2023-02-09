const axios = require('axios');
const tokeWeatherApi = 'ea60c8d4b8ef95379a41a0042ced5457';

const fetchData = async cityName => {
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

        return `
🌡 Temperature: ${Math.round(temp)}℃ 

🌡 Feels like temp: ${Math.round(feels_like)}℃ 

☁ Clouds: ${clouds.all}% 

🍃 Wind: ${wind.speed}km/h 

 ↘ Pressure: ${pressure}mmHg  

 📅 Valid until: ${dt_txt} `;
    } catch (error) {
        console.log('error.message', error.message);
    }
};

module.exports = fetchData;
