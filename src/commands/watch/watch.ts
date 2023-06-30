import { Command } from '../../types';
import { Middleware } from 'grammy';

const handler: Middleware = async (ctx) => {
  await ctx.reply('/watch ');
};
export const watch: Command = {
  command: 'watch',
  handler,
};
