const TelegramBot = require('node-telegram-bot-api');

const tokenTelegram = '6146937288:AAHJVBz0qHpNred3GTBPzNtZLZrL80NNe4w';

const bot = new TelegramBot(tokenTelegram, { polling: true });

const fetchData = require('./fetchData');

let currentInterval;

const mainMenu = {
    reply_markup: JSON.stringify({
        resize_keyboard: true,
        one_time_keyboard: true,

        keyboard: [[{ text: 'Weather in Mariupol' }]],
    }),
};

const weatherMenu = {
    reply_markup: JSON.stringify({
        resize_keyboard: true,
        one_time_keyboard: true,

        keyboard: [[{ text: 'Every 3 hours' }, { text: 'Every 6 hours' }], [{ text: 'Go Back' }]],
    }),
};

const interval = async ({ id, count, delay }) => {
    if (currentInterval) clearInterval(currentInterval);
    return setInterval(async () => {
        const data = await fetchData('Mariupol');
        await bot.sendMessage(id, `Weather every ${count} hours: \n${data}`);
    }, delay);
};

const app = async () => {
    try {
        await bot.setMyCommands([
            { command: '/start', description: 'Start app' },
            { command: '/weather_in_mariupol', description: 'Weather' },
            { command: '/stop', description: 'Stop send weather' },
        ]);

        bot.on('message', async ({ text, chat: { id } }) => {
            switch (text) {
                case '/start':
                    await bot.sendMessage(id, 'Hello!', mainMenu);
                    break;

                case 'Weather in Mariupol':
                case '/weather_in_mariupol':
                    const data = await fetchData('Mariupol');
                    await bot.sendMessage(id, data, weatherMenu);
                    break;

                case 'Go Back':
                    await bot.sendMessage(id, 'Return to main menu', mainMenu);
                    break;

                case 'Every 3 hours':
                    currentInterval = await interval({
                        id,
                        count: '3',
                        delay: 10800000,
                    });
                    break;

                case 'Every 6 hours':
                    currentInterval = await interval({
                        id,
                        count: '6',
                        delay: 21600000,
                    });
                    break;

                case '/stop':
                    await bot.sendMessage(id, 'Weather messages disabled');
                    clearInterval(currentInterval);
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
