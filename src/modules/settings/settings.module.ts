import { Module } from "@spraxium/common"
import { SettingsCommand } from "./commands/settings.command";
import { SettingsChannelHandler } from "./handlers/settings-channel.handler";
import { PvApiService } from "../pvApi/pvApi.service";

@Module({
    commands: [SettingsCommand],
    handlers: [SettingsChannelHandler],
    providers: [PvApiService]
})
export class SettingsModule {}