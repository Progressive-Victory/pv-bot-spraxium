import { ExampleCommand } from '../commands/example.command'
import { Ctx, SlashCommandHandler, SlashStringOption } from '@spraxium/common'
import type { ChatInputCommandInteraction } from 'discord.js'

@SlashCommandHandler(ExampleCommand)
export class ExampleHandler {
    async handle(
        @Ctx() interaction: ChatInputCommandInteraction,
        @SlashStringOption('mother') mother: string
    ): Promise<void> {
        await interaction.reply(
            `${mother} mother called. She was very proud of you.`
        )
    }
}
