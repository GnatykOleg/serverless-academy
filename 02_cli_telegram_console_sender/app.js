const TelegramBot = require('node-telegram-bot-api');

const { Command } = require('commander');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const program = new Command();

program.name('telegram-bot').description('CLI to some telegram message').version('0.8.0');

program
    .command('send-message')
    .alias('m')
    .description('Send message to telegram bot')
    .argument('<string>')
    .action(async msg => {
        await bot.sendMessage(CHAT_ID, msg);
        process.exit();
    });

program
    .command('send-photo')
    .alias('p')
    .description('Send photo to telegram bot, just drag and drop in console after command')
    .argument('<photo>')
    .action(async photo => {
        await bot.sendPhoto(CHAT_ID, photo);
        process.exit();
    });

program.parse(process.argv);
