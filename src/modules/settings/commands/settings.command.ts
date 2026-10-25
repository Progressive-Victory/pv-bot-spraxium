import { SlashChannelOptionConfig, SlashCommand, SlashOption, SlashOptionChoice, SlashStringOptionConfig, SlashSubcommand, SlashSubcommandGroup, SlashSubcommandGroups } from "@spraxium/common"
import { ChannelType } from "discord.js";

const targetSettingConfig = (
    choices: SlashOptionChoice<string>[]
): SlashStringOptionConfig => ({
    description: "Channel to update",
    required: true,
    choices
})

const targetChannelConfig: SlashChannelOptionConfig = {
    description: "Target channel",
    required: true,
    channelTypes: [ChannelType.GuildText, ChannelType.PublicThread]
}

@SlashSubcommandGroup({
    name: "channel",
    description: "Update channel settings"
})
class SettingsChannelGroup {
    @SlashOption.String("setting", targetSettingConfig([
        { name: "timeouts", value: "timeout_log_channel_id" },
        { name: "leaves", value: "leave_log_channel_id" },
        { name: "text channel updates", value: "channel_updates_log_channel_id" },
        { name: "voice channel updates", value: "voice_updates_log_channel_id" },
        { name: "nickname updates", value: "nickname_updates_log_channel_id" }
    ]))
    @SlashOption.Channel("channel", targetChannelConfig)
    @SlashSubcommand({ name: "logging", description: "Update the logging channel"})
    logging() {}

    @SlashOption.String("setting", targetSettingConfig([
        { name: "report log", value: "report_log_channel_id" }
    ]))
    @SlashOption.Channel("channel", targetChannelConfig)
    @SlashSubcommand({ name: "report", description: "Update the report channel"})
    report() {}

    @SlashOption.String("setting", targetSettingConfig([
        { name: "warn log", value: "warn_log_channel_id" }
    ]))
    @SlashOption.Channel("channel", targetChannelConfig)
    @SlashSubcommand({ name: "warn", description: "Update the warn channel"})
    warn() {}

    @SlashOption.String("setting", targetSettingConfig([
        { name: "welcome log", value: "welcome_channel_id" }
    ]))
    @SlashOption.Channel("channel", targetChannelConfig)
    @SlashSubcommand({ name: "welcome", description: "Update the welcome channel"})
    welcome() {}
}

@SlashSubcommandGroups([SettingsChannelGroup])
@SlashCommand({ name: "settings", description: "Admin tools for managing the server structure"})
export class SettingsCommand {
    build() {}
}