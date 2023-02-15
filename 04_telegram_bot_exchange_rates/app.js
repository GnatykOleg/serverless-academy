const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const fetchWeatherData = require('./fetchWeatherData');

const fetchExchangeRates = require('./fetchExchangeRates');

const fetchAdditionalFullInfo = require('./fetchAdditionalFullInfo');

const { mainMenu, exchangeRatesMenu, weatherMenu } = require('./keyboards');

const app = async () => {
    console.log('App starting');
    try {
        await bot.setMyCommands([
            { command: '/start', description: 'Start app' },
            { command: '/weather_in_mariupol', description: 'Weather' },
            { command: '/exchange_rates', description: 'Exchange rates' },
        ]);

        bot.on('message', async ({ text, chat: { id } }) => {
            switch (text) {
                case '/start':
                    await bot.sendMessage(id, 'Currency exchange and weather app', mainMenu);
                    break;

                case 'Weather in Mariupol':
                case '/weather_in_mariupol':
                    await bot.sendMessage(id, 'Weather menu', weatherMenu);
                    break;

                case 'Exchange Rates':
                case '/exchange_rates':
                    await bot.sendMessage(id, 'Exchange Rates Menu', exchangeRatesMenu);
                    break;

                case 'Current weather':
                    const data = await fetchAdditionalFullInfo('Mariupol');
                    await bot.sendMessage(id, data, weatherMenu);
                    break;

                case 'USD':
                    const ratesUsd = await fetchExchangeRates('USD');
                    await bot.sendMessage(id, ratesUsd, exchangeRatesMenu);
                    break;

                case 'EUR':
                    const ratesEur = await fetchExchangeRates('EUR');
                    await bot.sendMessage(id, ratesEur, exchangeRatesMenu);
                    break;

                case 'Go Back':
                    await bot.sendMessage(id, 'Return to main menu', mainMenu);
                    break;

                case 'Interval 3 hours':
                    const weatherDataThreeHours = await fetchWeatherData({
                        city: 'Mariupol',
                        hours: 3,
                    });

                    await bot.sendMessage(id, weatherDataThreeHours, weatherMenu);
                    break;

                case 'Interval 6 hours':
                    const weatherDataSixHours = await fetchWeatherData({
                        city: 'Mariupol',
                        hours: 6,
                    });

                    await bot.sendMessage(id, weatherDataSixHours, weatherMenu);
                    break;

                default:
                    return await bot.sendMessage(
                        id,
                        'There is no such command, enter / and you will see the available commands'
                    );
            }
        });
    } catch (error) {
        console.log('error.message', error.message);
    }
};

(async () => await app())();
