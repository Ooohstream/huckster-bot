import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { CalculationService } from './services';
import { DURATION } from './constants';

const token = process.env.TOKEN;

if (token) {
  const bot = new Telegraf(token);
  let chats: Array<{ id: string | number; interval: NodeJS.Timer }> = [];

  bot.command('watch', async (ctx) => {
    if (chats.find(({ id }) => ctx.chat.id === id))
      return await ctx.sendMessage('The watcher is already active!');
    ctx.sendMessage(await CalculationService.getAverageMessage());
    const interval = setInterval(async () => {
      ctx.sendMessage(await CalculationService.getAverageMessage());
    }, DURATION);
    chats.push({ id: ctx.chat.id, interval });
    console.log(`The watcher has been started by ${ctx.chat.id}`);
  });

  bot.command('currentInfo', async (ctx) => {
    ctx.sendMessage(await CalculationService.getAverageMessage());
  });

  bot.command('unwatch', async (ctx) => {
    if (!chats.find(({ id }) => ctx.chat.id === id))
      return await ctx.sendMessage('The watcher is not active yet!');
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
    process.env.DOMAIN && bot.launch({ webhook: { domain: process.env.DOMAIN, port: 3000 } });
    console.log('The bot has been started via webhook!');
  } else {
    bot.launch();
    console.log('The bot has been started via long-polling!');
  }

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
} else {
  console.log(`Couldn't start, no token provided!`);
}
