import { Composer } from 'grammy';
import { commands } from '../../commands';

const commandsMiddleware = new Composer();

commands.forEach(({ command, handler }) =>
  commandsMiddleware.command(command, handler),
);

export { commandsMiddleware };
