const TelegramBot = require('node-telegram-bot-api');

const { Command } = require('commander');

const token = '5632545680:AAHLlnvx4kUWEX5WCRpzUJqN3ADc7ny9f4M';
const chatId = '507043587';

const bot = new TelegramBot(token, { polling: true });

const program = new Command();

program.name('telegram-bot').description('CLI to some telegram message').version('0.8.0');

program
    .command('send-message')
    .alias('m')
    .description('Send message to telegram bot')
    .argument('<string>')
    .action(async msg => {
        await bot.sendMessage(chatId, msg);
        process.exit();
    });

program
    .command('send-photo')
    .alias('p')
    .description('Send photo to telegram bot, just drag and drop in console after command')
    .argument('<photo>')
    .action(async photo => {
        await bot.sendPhoto(chatId, photo);
        process.exit();
    });

program.parse(process.argv);
