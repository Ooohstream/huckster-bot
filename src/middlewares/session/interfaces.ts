import { Context, SessionFlavor } from 'grammy';

export interface SessionData {
  pinnedMessageId: number;
}

export type SessionFlavouredContext = Context &
  SessionFlavor<SessionData>;
