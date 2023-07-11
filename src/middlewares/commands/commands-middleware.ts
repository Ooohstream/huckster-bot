import { Composer } from 'grammy';
import { commands } from '../../commands';
import { SessionFlavouredContext } from '../session/interfaces';

const commandsMiddleware = new Composer<SessionFlavouredContext>();

commands.forEach(({ command, handler }) =>
  commandsMiddleware.command(command, handler),
);

export { commandsMiddleware };
