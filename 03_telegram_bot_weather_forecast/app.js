const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const { mainMenu, weatherMenu } = require('./keyboards');

const fetchWeatherData = require('./fetchWeatherData');

const app = async () => {
    try {
        await bot.setMyCommands([
            { command: '/start', description: 'Start app' },
            { command: '/weather_in_mariupol', description: 'Weather' },
        ]);

        bot.on('message', async ({ text, chat: { id } }) => {
            switch (text) {
                case '/start':
                    await bot.sendMessage(id, 'Hello!', mainMenu);
                    break;

                case 'Weather in Mariupol':
                case '/weather_in_mariupol':
                    await bot.sendMessage(id, 'Weather menu', weatherMenu);
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
