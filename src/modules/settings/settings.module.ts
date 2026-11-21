import { PvApiService } from '../pvApi/pvApi.service'
import { SettingsCommand } from './commands/settings.command'
import { SettingsChannelHandler } from './handlers/settings-channel.handler'
import { Module } from '@spraxium/common'

@Module({
    commands: [SettingsCommand],
    handlers: [SettingsChannelHandler],
    imports: [PvApiService],
})
export class SettingsModule {}
