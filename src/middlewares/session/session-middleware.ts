import { session } from 'grammy';
import { PsqlAdapter } from '@grammyjs/storage-psql';
import { client } from './database-client';

await client.connect();

export const sessionMiddleware = session({
  initial: () => ({ pinnedMessageId: 0 }),
  storage: await PsqlAdapter.create({
    tableName: String(process.env.DB_TABLE_NAME),
    client,
  }),
});
