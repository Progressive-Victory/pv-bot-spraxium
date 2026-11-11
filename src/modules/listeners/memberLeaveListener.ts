import { PvApiService } from '../pvApi/pvApi.service'
import { Events, Listener, On } from '@spraxium/common'
import { GuildMember, PartialGuildMember } from 'discord.js'
import { DiscordUserStatus } from 'pv-contracts/data'
import { UpdateDiscordUserRequest, zUpdateDiscordUserRequest } from 'pv-contracts/requests'

@Listener(Events.GuildMemberRemove)
export class MemberLeaveListener {
  
  constructor(private readonly pvApiService: PvApiService) { }
  
  @On()
  async onLeave(member: GuildMember | PartialGuildMember): Promise<void> {
    const endpoint = this.pvApiService.routes.discordUser(member.id)
    const body: UpdateDiscordUserRequest = {status: DiscordUserStatus.Left}
    try {
      await this.pvApiService.patch(endpoint, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } catch {
      console.log("Could not update discord user status to 'left'")
    }
  }
}
