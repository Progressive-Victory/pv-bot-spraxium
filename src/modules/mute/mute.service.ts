import { Injectable } from '@spraxium/common'
import { MaintenanceException } from '@spraxium/core'
import { DiscordAPIError, GuildMember } from 'discord.js'

export type MuteInfo = {
    mutingMember: GuildMember
    targetMember: GuildMember
    durationInMinutes: number
    reason: string
}

type MuteEntry = {
    until: Date
}

/** Try to mute/unmute the user, doing nothing if they are not in vc */
async function trySetMute(member: GuildMember, mute: boolean): Promise<void> {
    // if the user already has the given state or is not in a vc we don't need to set it
    if (member.voice.serverMute === mute || member.voice.serverMute === null) {
        return
    }
    try {
        await member.voice.setMute(mute)
    } catch (error) {
        if (!(error instanceof DiscordAPIError) || error.code != 40032) {
            throw error
        }
    }
}

// used to uniquely identify a GuildMember (guild id + user id)
function getMemberKey(member: GuildMember): string {
    return member.guild.id + ':' + member.id
}

@Injectable()
export class MuteService {
    private voiceMuted = new Map<string, MuteEntry>()

    /** Checks whether the given member should be muted according to the mute service. */
    shouldBeVoiceMuted(member: GuildMember): boolean {
        let entry = this.voiceMuted.get(getMemberKey(member))
        const now = new Date()
        if (entry && entry.until < now) {
            this.voiceMuted.delete(getMemberKey(member))
            entry = undefined
        }
        return !!entry
    }

    /** Mutes a given user. If the user is already muted, overwrite the time until they are unmuted. */
    async muteVoice(muteInfo: MuteInfo): Promise<void> {
        const delayMilliseconds = muteInfo.durationInMinutes * 60000
        // just in case
        if (delayMilliseconds <= 5000) return
        const until = new Date(Date.now() + delayMilliseconds)

        setTimeout(() => {
            this.updateVoice(muteInfo.targetMember)
        }, delayMilliseconds)
        this.voiceMuted.set(getMemberKey(muteInfo.targetMember), { until })
        await trySetMute(muteInfo.targetMember, true)
    }

    /** Attempt to unmute the user and remove them from the set of muted users. */
    async unmuteVoice(
        member: GuildMember,
        _unmutingMember: GuildMember
    ): Promise<void> {
        this.voiceMuted.delete(getMemberKey(member))
        await trySetMute(member, false)
    }

    /** Update the user's discord mute status. */
    async updateVoice(member: GuildMember): Promise<void> {
        const shouldBeMuted = this.shouldBeVoiceMuted(member)
        await trySetMute(member, shouldBeMuted)
    }

    /** Trigger when the user is server muted, whether by the bot or an admin. */
    async onServerMute(
        targetMember: GuildMember,
        mutingMember: GuildMember
    ): Promise<void> {
        // we don't want this to trigger for mutes done by the bot
        if (this.shouldBeVoiceMuted(targetMember)) return

        await this.muteVoice({
            // as far as I am aware there is no way to determine who did the mute, only that the mute status has changed
            mutingMember,
            targetMember,
            // 6 hours seems reasonable for a manual mute
            // they can always unmute early if necessary
            durationInMinutes: 360,
            reason: 'manually muted by administrator',
        })
    }

    /** Trigger when the user is server unmuted, whether by the bot or an admin */
    async onServerUnmute(
        targetMember: GuildMember,
        unmutingMember: GuildMember
    ): Promise<void> {
        // should be unmuted already anyway
        if (!this.shouldBeVoiceMuted(targetMember)) return

        await this.unmuteVoice(targetMember, unmutingMember)
    }

    // TODO
    async muteText(_muteInfo: MuteInfo): Promise<void> {
        throw new MaintenanceException({
            feature: 'text mute',
        })
    }

    // TODO
    async unmuteText(
        _member: GuildMember,
        _unmutingMember: GuildMember
    ): Promise<void> {}
}
