import 'dotenv/config';
import { CalculationService } from './services';
import { DURATION } from './constants';
import { Bot, webhookCallback } from 'grammy';
import express from 'express';

const token = process.env.TOKEN;

if (token) {
  const bot = new Bot(token);
  let chats: Array<{ id: string | number; interval: NodeJS.Timer }> = [];

  bot.command('watch', async (ctx) => {
    if (chats.find(({ id }) => ctx.chat.id === id))
      return await ctx.reply('The watcher is already active!');
    await ctx.reply(await CalculationService.getAverageMessage());
    const interval = setInterval(async () => {
      await ctx.reply(await CalculationService.getAverageMessage());
    }, DURATION);
    chats.push({ id: ctx.chat.id, interval });
    console.log(`The watcher has been started by ${ctx.chat.id}`);
  });

  bot.command('info', async (ctx) => {
    await ctx.reply(await CalculationService.getAverageMessage());
  });

  bot.command('calculate', async (ctx) => {
    const message = String(ctx?.message?.text);
    const coefficient = Number(message.split(' ')[1]);
    const { rubTryAverageWithCommission } = await CalculationService.getAverageObject();
    const calculatedRub = (rubTryAverageWithCommission * coefficient).toFixed(2);
    await ctx.reply(`${calculatedRub}₽`);
  });

  bot.command('unwatch', async (ctx) => {
    if (!chats.find(({ id }) => ctx.chat.id === id))
      return await ctx.reply('The watcher is not active yet!');
    chats = chats.filter(({ id, interval }) => {
      if (id === ctx.chat.id) {
        clearInterval(interval);
        return false;
      }
      return true;
    });
    console.log(`The watched has been stopped by ${ctx.chat.id}`);
  });

  if (process.env.NODE_ENV === 'production') {
    const app = express();
    const secretPath = String(process.env.TOKEN);
    const domain = String(process.env.DOMAIN);
    app.use(express.json());
    app.use(`/${secretPath}`, webhookCallback(bot));
    app.get('/', (req, res) => {
      res.send({ message: 'ok' }).status(200);
    });
    app.listen(Number(process.env.PORT), async () => {
      await bot.api.setWebhook(`https://${domain}/${secretPath}`);
      console.log('The bot has been started via webhook!');
    });
  } else {
    bot.start();
    console.log('The bot has been started via long-polling!');
  }
} else {
  console.log(`Couldn't start, no token provided!`);
}
