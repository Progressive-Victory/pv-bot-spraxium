import { Module } from "@spraxium/common"
import { SettingsCommand } from "./commands/settings.command";
import { ChannelHandler } from "./handlers/settings-channel.handler";

@Module({
    commands: [SettingsCommand],
    handlers: [ChannelHandler]
})
export class SettingsModule {}