import { Command } from '../../types';
import { Middleware } from 'grammy';

const handler: Middleware = async (ctx) => {
  await ctx.reply('/info ');
};
export const info: Command = {
  command: 'info',
  handler,
};
