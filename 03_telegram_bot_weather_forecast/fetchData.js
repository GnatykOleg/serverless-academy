const axios = require('axios');

const TOKEN_WEATHER_API = process.env.TOKEN_WEATHER_API;

console.log('TOKEN_WEATHER_API', TOKEN_WEATHER_API);

const fetchWeatherData = async cityName => {
    try {
        console.log('TOKEN_WEATHER_API во время вызова', TOKEN_WEATHER_API);
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=1&units=metric&appid=${TOKEN_WEATHER_API}`
        );

        const { main, dt_txt, clouds, wind, pop } = data.list[0];

        const { pressure, temp, feels_like, humidity } = main;

        const fullWeatherInfo = `
🌡 Temperature: ${Math.round(temp)}℃ 

🌡 Feels like temp: ${Math.round(feels_like)}℃

💧 Humidity: ${humidity}%

💨 Wind: ${wind.speed}m/s

↘ Pressure: ${pressure}hPa 

☁️ Clouds: ${clouds.all}% 

🌧 Probability of precipitation: ${pop}%

📅 Actual on : ${dt_txt} `;

        return fullWeatherInfo;
    } catch (error) {
        console.log('error.message', error.message);
    }
};

module.exports = fetchWeatherData;
