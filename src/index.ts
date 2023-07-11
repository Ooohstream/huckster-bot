import 'dotenv/config';
import express from 'express';
import { Bot, webhookCallback } from 'grammy';
import { commandsMiddleware } from './middlewares';
import { commandDescriptions as commands } from './commands';
import { generateDevDomain } from './utils';
import { sessionMiddleware } from './middlewares/session/session-middleware';
import { SessionFlavouredContext } from './middlewares/session/interfaces';

const bot = new Bot<SessionFlavouredContext>(
  String(process.env.TOKEN),
);

bot.use(sessionMiddleware);
bot.use(commandsMiddleware);

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
