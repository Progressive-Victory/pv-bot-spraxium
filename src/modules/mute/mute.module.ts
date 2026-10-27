import { MuteCommand } from './commands/mute.command'
import { MuteHandler } from './handlers/mute.handler'
import { AuditLogListener } from './listeners/audit-log.listener'
import { VoiceStateListener } from './listeners/voice-state.listener'
import { MuteService } from './mute.service'
import { Module } from '@spraxium/common'

@Module({
    commands: [MuteCommand],
    handlers: [MuteHandler],
    providers: [MuteService],
    listeners: [VoiceStateListener, AuditLogListener],
})
export class MuteModule {}
