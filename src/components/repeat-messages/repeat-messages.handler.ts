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
    @ModalTextField('description_field') description_field: string,
    @Ctx() ctx: ModalContext,
  ): Promise<void> {
    await ctx.reply({
      content: `Testing '${description_field}.`,
      flags: 'Ephemeral',
    });
  }
}
