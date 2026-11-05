import { Ctx, SlashCommandHandler } from '@spraxium/common';
import { ModalService } from '@spraxium/components';
import type { ChatInputCommandInteraction } from 'discord.js';
import { RepeatMessageModal } from './repeat-messages.modal';
import { TestRepeatMessagesCommand } from './repeat-messages.command';

@SlashCommandHandler(TestRepeatMessagesCommand)
export class RepeatMessagesCommandHandler {
  constructor(private readonly modals: ModalService) {}

  async handle(@Ctx() interaction: ChatInputCommandInteraction): Promise<void> {
    const modal = this.modals.build(RepeatMessageModal);
    console.log("Command handler hit");
    await interaction.showModal(modal);
  }
}