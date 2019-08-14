import * as dotenv from 'dotenv';
import * as PixivAppApi from 'pixiv-app-api';
import TelegramBot = require('node-telegram-bot-api');
import getImageStream from './lib/parcer';

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

const pixiv = new PixivAppApi(process.env.PIXIV_LOGIN, process.env.PIXIV_PASSWORD);

const word = 'ラブライブ';
pixiv.searchIllust(word).then(async json => {
    for (const illust of json.illusts) {
        const buffer = await getImageStream(illust.imageUrls.large);
        bot.sendPhoto(process.env.TELEGRAM_CHANNEL, buffer);
    }
});
