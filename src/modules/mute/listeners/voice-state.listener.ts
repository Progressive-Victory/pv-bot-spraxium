import { MuteService } from '../mute.service'
import { Events, Listener, On } from '@spraxium/common'
import { VoiceState } from 'discord.js'

@Listener(Events.VoiceStateUpdate)
export class VoiceStateListener {
    constructor(private readonly muteService: MuteService) {}

    @On()
    async onVoiceStateUpdate(
        oldState: VoiceState,
        newState: VoiceState
    ): Promise<void> {
        if (!newState.member) return

        // check vc join events
        if (!oldState.channel && newState.channel) {
            await this.muteService.updateVoice(newState.member)
            return
        }
    }
}
