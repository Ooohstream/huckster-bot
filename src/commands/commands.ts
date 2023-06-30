import { Command } from '../types';
import { watch } from './watch';
import { info } from './info';
import { calculate } from './calculate';
import { unwatch } from './unwatch';

export const commands: Array<Command> = [
  watch,
  unwatch,
  info,
  calculate,
];
export const commandDescriptions = commands.map(
  ({ command, description }) => ({
    command,
    description: description || '\xa0',
  }),
);
