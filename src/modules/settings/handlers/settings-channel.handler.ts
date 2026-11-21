import { PvApiService } from '../../pvApi/pvApi.service'
import { SettingsCommand } from '../commands/settings.command'
import {
    Ctx,
    SlashChannelOption,
    SlashCommandHandler,
    SlashOptionChoice,
    SlashStringOption,
} from '@spraxium/common'
import { ChatInputCommandInteraction, GuildBasedChannel } from 'discord.js'

@SlashCommandHandler(SettingsCommand, { sub: 'channel' })
export class SettingsChannelHandler {
    constructor(private readonly pvApiService: PvApiService) {}

    async handle(
        @Ctx() interaction: ChatInputCommandInteraction,
        @SlashStringOption('setting') setting: SlashOptionChoice<string> | null,
        @SlashChannelOption('channel') channel: GuildBasedChannel | null
    ): Promise<void> {
        if (!setting || !channel) {
            await interaction.reply({
                content: 'Invalid request',
                flags: 'Ephemeral',
            })
            return
        }

        const endpoint = this.pvApiService.routes.setting(setting.value)

        try {
            await this.pvApiService.put(endpoint, {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: channel.id }),
            })
            await interaction.reply({
                content: `Updated ${setting.name} to channel [#${channel.name}](${channel.url}).`,
            })
            return
        } catch {
            await interaction.reply({
                content:
                    'Error when updating settings channel. Please notify the engineering team via the #bug-reports channel.',
            })
        }
    }
}
