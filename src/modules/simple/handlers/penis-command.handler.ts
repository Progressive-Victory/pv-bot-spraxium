import { Ctx, SlashCommandHandler, SlashStringOption } from "@spraxium/common";
import { PenisCommand } from "../commands/penis.command"
import type { ChatInputCommandInteraction } from 'discord.js'

@SlashCommandHandler(PenisCommand)
export class PenisHandler{
    async handle(
        @Ctx() interaction: ChatInputCommandInteraction,
        @SlashStringOption('mother') mother: string
    ): Promise<void> {
        await interaction.reply(`I am fucking ${mother} mother`)
    }
}