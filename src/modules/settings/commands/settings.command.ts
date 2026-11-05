import { SlashChannelOptionConfig, SlashCommand, SlashOption, SlashOptionChoice, SlashStringOptionConfig, SlashSubcommand, SlashSubcommandGroup, SlashSubcommandGroups } from "@spraxium/common"
import { ChannelType } from "discord.js";

@SlashCommand({ name: "settings", description: "Admin tools for managing the server structure"})
export class SettingsCommand {
    @SlashOption.String("setting", {
    description: "Channel to update",
    required: true,
    choices: [
        { name: "timeouts", value: "timeout_log_channel_id" },
        { name: "leaves", value: "leave_log_channel_id" },
        { name: "text channel updates", value: "channel_updates_log_channel_id" },
        { name: "voice channel updates", value: "voice_updates_log_channel_id" },
        { name: "nickname updates", value: "nickname_updates_log_channel_id" },
        { name: "reports", value: "report_log_channel_id" },
        { name: "warns", value: "warn_log_channel_id" },
        { name: "welcomes", value: "welcome_channel_id" }
    ]
})
    @SlashOption.Channel("channel", {
    description: "Target channel",
    required: true,
    channelTypes: [ChannelType.GuildText, ChannelType.PublicThread]
})
    @SlashSubcommand({ name: "channel", description: "Update the channel"})
    build() {}
}