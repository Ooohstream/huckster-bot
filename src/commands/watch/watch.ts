import { Command } from '../../types';
import { Middleware } from 'grammy';
import { SessionFlavouredContext } from '../../middlewares/session/interfaces';

const handler: Middleware<SessionFlavouredContext> = async (ctx) => {
  const arg = String(ctx.message?.text?.split(' ')[1]);
  if (!ctx.session?.pinnedMessageId) {
    const messageToPin = await ctx.reply(arg);
    await ctx.pinChatMessage(messageToPin.message_id);
    ctx.session.pinnedMessageId = messageToPin.message_id;
    return;
  }

  await ctx.api.editMessageText(
    String(ctx.chat?.id),
    ctx.session.pinnedMessageId,
    arg,
  );
};
export const watch: Command = {
  command: 'watch',
  handler,
};
