const axios = require('axios');

const TOKEN_WEATHER_API = process.env.TOKEN_WEATHER_API;

const fetchWeatherData = async ({ city, hours }) => {
    try {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${TOKEN_WEATHER_API}`
        );

        const filteredArray = data.list.filter(({ dt_txt }, index, array) => {
            if (index === 0) return true;

            if (index > 0) {
                const division = new Date(array[0].dt_txt).getHours() % 6 === 0;
                return division
                    ? new Date(dt_txt).getHours() % 6 === 0
                    : new Date(array[index - 1].dt_txt).getHours() % 6 === 0;
            }
        });

        const dataInterval = hours === 3 ? data.list : filteredArray;

        const mappedArray = dataInterval.map(({ main, dt_txt, weather }) => {
            const newDate = new Date(dt_txt);

            const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' })
                .format(newDate)
                .toLowerCase();

            const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(newDate);

            const timeString = newDate.toLocaleString('en', {
                hour: '2-digit',
                minute: '2-digit',
                hourCycle: 'h23',
            });

            const temp = Math.round(main.temp);
            const feelLike = Math.round(main.feels_like);
            const forecast = weather[0].description;
            const date = newDate.getDate();

            return { dayName, monthName, temp, feelLike, forecast, timeString, date };
        });

        const result = mappedArray.reduce((acc, element, index, array) => {
            const { dayName, monthName, temp, timeString, feelLike, forecast, date } = element;

            if (index === 0 || dayName !== array[index - 1].dayName) {
                acc += `\n \n${dayName} ${date} ${monthName} :\n`;
            }

            acc += `\n${timeString}, 🌡 Temp: ${temp}℃, 🌡 Feels like: ${feelLike}℃, 🌦${forecast}`;

            return acc;
        }, '');

        return result;
    } catch (error) {
        console.log('error.message', error.message);
    }
};

module.exports = fetchWeatherData;
