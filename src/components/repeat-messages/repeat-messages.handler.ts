import { Ctx } from "@spraxium/common";
import {
  ModalHandler,
  ModalTextField,
  type ModalContext,
} from '@spraxium/components';
import { RepeatMessageModal } from './repeat-messages.modal';

@ModalHandler(RepeatMessageModal)
export class RepeatMessageHandler {
  async handle(
    @ModalTextField('test_field') test_field: string,
    @Ctx() ctx: ModalContext,
  ): Promise<void> {
    await ctx.reply({
      content: `Testing '${test_field}.`,
      flags: 'Ephemeral',
    });
  }
}
