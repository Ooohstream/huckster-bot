import { Command } from '../../types';
import { Middleware } from 'grammy';

const handler: Middleware = async (ctx) => {
  await ctx.reply('/calculate ');
};
export const calculate: Command = {
  command: 'calculate',
  handler,
};
