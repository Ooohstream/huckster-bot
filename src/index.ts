import 'dotenv/config';
import express from 'express';
import { Bot, webhookCallback } from 'grammy';
import { commandsMiddleware } from './middlewares';
import { commandDescriptions as commands } from './commands';
import { generateDevDomain } from './utils';

const bot = new Bot(String(process.env.TOKEN));
bot.use(commandsMiddleware);
bot.use(async (ctx, next) => {
  console.log(ctx.message);
  await next();
});
const secretPath = String(process.env.TOKEN);
const domain = String(
  process.env.DOMAIN || (await generateDevDomain()),
);

express()
  .use(express.json())
  .use(`/${secretPath}`, webhookCallback(bot))
  .get('/', (req, res) => {
    res.send({ message: 'ok' }).status(200);
  })
  .listen(Number(process.env.PORT), async () => {
    await bot.api.setWebhook(`https://${domain}/${secretPath}`);
    await bot.api.setMyCommands(commands);
    console.log('The bot has been started via webhook!');
  });
