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

const interval = async ({ id, count, data, delay }) => {
    return setInterval(async () => {
        await bot.sendMessage(id, `Weather every ${count} hours: \n${data}`);
    }, delay);
};

const app = async () => {
    await bot.setMyCommands([
        { command: '/start', description: 'Start app' },
        { command: '/weather_in_mariupol', description: 'Weather' },
        { command: '/stop', description: 'Stop send weather' },
    ]);

    bot.on('message', async msg => {
        const { text, chat } = msg;

        const data = await fetchData('Mariupol');

        switch (text) {
            case '/start':
                await bot.sendMessage(chat.id, 'Hello!', mainMenu);
                break;

            case 'Weather in Mariupol':
            case '/weather_in_mariupol':
                await bot.sendMessage(chat.id, data, weatherMenu);
                break;

            case 'Go Back':
                await bot.sendMessage(chat.id, 'Return to main menu', mainMenu);
                break;

            case 'Every 3 hours':
                clearInterval(currentInterval);

                currentInterval = await interval({ id: chat.id, count: '3', data, delay: 1000 });
                break;

            case 'Every 6 hours':
                clearInterval(currentInterval);

                currentInterval = await interval({ id: chat.id, count: '6', data, delay: 5000 });
                break;

            case '/stop':
                await bot.sendMessage(chat.id, 'Weather messages disabled');
                clearInterval(currentInterval);
                break;

            default:
                return await bot.sendMessage(
                    chat.id,
                    'There is no such command, enter / and you will see the available commands'
                );
        }
    });
};

app();
