import { Middleware } from 'grammy';
import { SessionFlavouredContext } from '../middlewares/session/interfaces';

export interface Command {
  command: string;
  handler: Middleware<SessionFlavouredContext>;
  description?: string;
}
