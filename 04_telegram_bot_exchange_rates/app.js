const TelegramBot = require('node-telegram-bot-api');

const tokenTelegram = '6046462625:AAH1gHvBU2_OhuZ4SAr6qJgEIyjxgacqMwI';

const bot = new TelegramBot(tokenTelegram, { polling: true });

const fetchWeatherData = require('./fetchWeatherData');

const fetchExchangeRates = require('./fetchExchangeRates');

const { mainMenu, exchangeRatesMenu, weatherMenu } = require('./keyboards');

let currentInterval;

const interval = async ({ id, count, delay }) => {
    return setInterval(async () => {
        const weatherData = await fetchWeatherData('Mariupol', 'full');
        await bot.sendMessage(id, `Weather every ${count} hours: \n${weatherData}`);
    }, delay);
};

const app = async () => {
    console.log('Приложение запустилось');
    try {
        await bot.setMyCommands([
            { command: '/start', description: 'Start app' },
            { command: '/weather_in_mariupol', description: 'Weather' },
            { command: '/exchange_rates', description: 'Weather' },
            { command: '/stop', description: 'Stop send weather' },
        ]);

        bot.on('message', async msg => {
            const { text, chat } = msg;

            switch (text) {
                case '/start':
                    await bot.sendMessage(chat.id, 'Приложение Обмена валют и погоды', mainMenu);
                    break;

                case 'Weather in Mariupol':
                case '/weather_in_mariupol':
                    const weatherData = await fetchWeatherData('Mariupol', 'full');
                    await bot.sendMessage(chat.id, weatherData, weatherMenu);
                    break;

                case 'Exchange Rates':
                case '/exchange_rates':
                    await bot.sendMessage(chat.id, 'Exchange Rates Menu', exchangeRatesMenu);
                    break;

                case 'Wind':
                    const windData = await fetchWeatherData('Mariupol');
                    await bot.sendMessage(chat.id, windData, weatherMenu);
                    break;

                case 'USD':
                    const ratesUsd = await fetchExchangeRates('USD');
                    await bot.sendMessage(chat.id, ratesUsd, exchangeRatesMenu);
                    break;

                case 'EUR':
                    const ratesEur = await fetchExchangeRates('EUR');
                    await bot.sendMessage(chat.id, ratesEur, exchangeRatesMenu);
                    break;

                case 'Go Back':
                    await bot.sendMessage(chat.id, 'Return to main menu', mainMenu);
                    break;

                case 'Every 3 hours':
                    clearInterval(currentInterval);

                    currentInterval = await interval({
                        id: chat.id,
                        count: '3',

                        // delay: 10800000,
                        delay: 1000,
                    });
                    await bot.sendMessage(
                        chat.id,
                        'We send you weather every 3 hours',
                        weatherMenu
                    );
                    break;

                case 'Every 6 hours':
                    clearInterval(currentInterval);

                    currentInterval = await interval({
                        id: chat.id,
                        count: '6',

                        // delay: 21600000,
                        delay: 5000,
                    });
                    await bot.sendMessage(
                        chat.id,
                        'We send you weather every 6 hours',
                        weatherMenu
                    );
                    break;

                case '/stop':
                case 'Stop sending weather':
                    await bot.sendMessage(chat.id, 'Weather messages disabled', mainMenu);
                    clearInterval(currentInterval);
                    break;

                default:
                    return await bot.sendMessage(
                        chat.id,
                        'There is no such command, enter / and you will see the available commands'
                    );
            }
        });
    } catch (error) {
        console.log('error.message', error.message);
    }
};

(async () => await app())();
