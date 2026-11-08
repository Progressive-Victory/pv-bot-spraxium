import { BanCommand } from '../commands/ban.command'
import { Ctx, SlashCommandHandler, SlashStringOption, SlashBooleanOption } from '@spraxium/common'
import type { ChatInputCommandInteraction } from 'discord.js'

@SlashCommandHandler(BanCommand)
export class BanHandler {
    async handle(
        @Ctx() interaction: ChatInputCommandInteraction,
        @SlashStringOption('reason') reason: string,
        @SlashBooleanOption('delete-message') deleteMessage: boolean
    ): Promise<void> {
        await interaction.reply(
            `User banned for reason: ${reason}. Delete messages: ${deleteMessage}`
        )
    }
}
