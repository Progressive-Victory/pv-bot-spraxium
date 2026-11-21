import { PvApiModule } from '../pvApi/pvApi.module'
import { SettingsCommand } from './commands/settings.command'
import { SettingsChannelHandler } from './handlers/settings-channel.handler'
import { Module } from '@spraxium/common'

@Module({
    commands: [SettingsCommand],
    handlers: [SettingsChannelHandler],
    imports: [PvApiModule],
})
export class SettingsModule {}
