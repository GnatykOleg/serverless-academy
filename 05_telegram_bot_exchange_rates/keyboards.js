const mainMenu = {
    reply_markup: JSON.stringify({
        resize_keyboard: true,
        one_time_keyboard: true,

        keyboard: [[{ text: 'Weather in Mariupol' }], [{ text: 'Exchange Rates' }]],
    }),
};

const exchangeRatesMenu = {
    reply_markup: JSON.stringify({
        resize_keyboard: true,
        one_time_keyboard: true,

        keyboard: [[{ text: 'USD' }, { text: 'EUR' }], [{ text: 'Go Back' }]],
    }),
};

const weatherMenu = {
    reply_markup: JSON.stringify({
        resize_keyboard: true,
        one_time_keyboard: true,

        keyboard: [
            [{ text: 'Interval 3 hours' }, { text: 'Interval 6 hours' }],
            [{ text: 'Current weather' }],
            [{ text: 'Go Back' }],
        ],
    }),
};

module.exports = { mainMenu, exchangeRatesMenu, weatherMenu };
