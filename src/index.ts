import * as dotenv from 'dotenv';
import * as PixivAppApi from 'pixiv-app-api';
import TelegramBot = require('node-telegram-bot-api');
import getImageStream from './lib/parcer';
import { getHoursFromStart } from './lib/time';

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

const pixiv = new PixivAppApi(process.env.PIXIV_LOGIN, process.env.PIXIV_PASSWORD);

const word = 'ヴァイオレット・エヴァーガーデン';

setInterval(async () => {
    let hours: number;

    if (!hours || hours < getHoursFromStart()) {
        const { illusts } = await pixiv.searchIllust(word);
        for (const illust of illusts) {
            const buffer = await getImageStream(illust.imageUrls.large);
            await bot.sendPhoto(process.env.TELEGRAM_CHANNEL, buffer);
        }
        hours = getHoursFromStart();
    }
}, 3000);
