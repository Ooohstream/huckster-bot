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
  });

  bot.command('currentInfo', async (ctx) => {
    ctx.sendMessage(await CalculationService.getAverageMessage());
  });

  bot.command('unwatch', async (ctx) => {
    console.log(!chats.find(({ id }) => ctx.chat.id === id));
    if (!chats.find(({ id }) => ctx.chat.id === id))
      return await ctx.sendMessage('The watcher is not active yet!');
    chats = chats.filter(({ id, interval }) => {
      if (id === ctx.chat.id) {
        clearInterval(interval);
        return false;
      }
      return true;
    });
  });

  bot.launch();

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
} else {
  console.log(`Couldn't start, no token provided!`);
}