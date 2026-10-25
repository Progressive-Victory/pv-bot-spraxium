import { Ctx, SlashChannelOption, SlashCommandHandler, SlashOptionChoice, SlashStringOption } from "@spraxium/common";
import { SettingsCommand } from "../commands/settings.command";
import { ChatInputCommandInteraction, GuildBasedChannel } from "discord.js";


@SlashCommandHandler(SettingsCommand, { group: "channel", sub: "logging"})
@SlashCommandHandler(SettingsCommand, { group: "channel", sub: "reports"})
@SlashCommandHandler(SettingsCommand, { group: "channel", sub: "welcome"})
@SlashCommandHandler(SettingsCommand, { group: "channel", sub: "warn"})
export class ChannelHandler {
    async handle(
        @Ctx() interaction: ChatInputCommandInteraction,
        @SlashStringOption("setting") setting: SlashOptionChoice<string> | null,
        @SlashChannelOption("channel") channel: GuildBasedChannel | null
    ) {
        if (!setting || !channel) {
            await interaction.reply({ content: "Invalid request", flags: "Ephemeral" })
            return
        }

        await interaction.reply({ content: `Updating ${setting.name} to channel ${channel.name}...`})
        return
    }
}