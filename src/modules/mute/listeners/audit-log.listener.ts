import { MuteService } from '../mute.service'
import { Events, Listener, On } from '@spraxium/common'
import { Guild, GuildAuditLogsEntry, User } from 'discord.js'

@Listener(Events.GuildAuditLogEntryCreate)
export class AuditLogListener {
    constructor(private readonly muteService: MuteService) {}

    @On()
    async onAuditLogEntry(
        auditLogEntry: GuildAuditLogsEntry,
        guild: Guild
    ): Promise<void> {
        if (!(auditLogEntry.target instanceof User)) return
        if (!(auditLogEntry.executor instanceof User)) return

        const targetMember = await guild.members.fetch(auditLogEntry.target)
        const mutingMember = await guild.members.fetch(auditLogEntry.executor)

        const muteChange = auditLogEntry.changes.find(
            (change) => change.key == 'mute'
        )
        if (!muteChange) return

        // check for server mute events
        if (muteChange.old === false && muteChange.new === true) {
            this.muteService.onServerMute(targetMember, mutingMember)
        }

        // check for server unmute events
        if (muteChange.old === true && muteChange.new === false) {
            this.muteService.onServerUnmute(targetMember, mutingMember)
        }
    }
}
