const weatherMenu = {
    reply_markup: JSON.stringify({
        resize_keyboard: true,
        one_time_keyboard: true,

        keyboard: [
            [{ text: 'Interval 3 hours' }, { text: 'Interval 6 hours' }],
            [{ text: 'Go Back' }],
        ],
    }),
};

const mainMenu = {
    reply_markup: JSON.stringify({
        resize_keyboard: true,
        one_time_keyboard: true,

        keyboard: [[{ text: 'Weather in Mariupol' }]],
    }),
};

module.exports = { weatherMenu, mainMenu };
