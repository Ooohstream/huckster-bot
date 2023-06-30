import { Command } from '../../types';
import { Middleware } from 'grammy';

const handler: Middleware = async (ctx) => {
  await ctx.reply('/unwatch ');
};
export const unwatch: Command = {
  command: 'unwatch',
  handler,
};
