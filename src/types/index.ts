import { Middleware } from 'grammy';

export interface Command {
  command: string;
  handler: Middleware;
  description?: string;
}
