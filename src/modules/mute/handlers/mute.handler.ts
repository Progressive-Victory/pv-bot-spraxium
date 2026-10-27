import {
    getDurationText,
    MuteCommand,
    MuteType,
} from '../commands/mute.command'
import { MuteInfo, MuteService } from '../mute.service'
import {
    Ctx,
    SlashCommandHandler,
    SlashIntegerOption,
    SlashStringOption,
    SlashUserOption,
    UseGuards,
} from '@spraxium/common'
import { GuildOnly } from '@spraxium/core'
import {
    ContainerBuilder,
    MessageFlags,
    SeparatorBuilder,
    SeparatorSpacingSize,
    subtext,
    TextDisplayBuilder,
    type ChatInputCommandInteraction,
    type TextBasedChannel,
    type User,
} from 'discord.js'

@UseGuards(GuildOnly)
@SlashCommandHandler(MuteCommand)
export class MuteHandler {
    constructor(private readonly muteService: MuteService) {}

    async handle(
        @Ctx() interaction: ChatInputCommandInteraction,
        @SlashUserOption('target') target: User,
        @SlashIntegerOption('duration') durationInMinutes: number,
        @SlashIntegerOption('type') muteType: MuteType,
        @SlashStringOption('reason') reason: string
    ): Promise<void> {
        let guild = interaction.guild
        if (guild === null) {
            interaction.reply({
                content: 'Guild should not be null...',
                flags: [MessageFlags.Ephemeral],
            })
            return
        }
        const mutingMember = await guild.members.fetch(interaction.user)
        const targetMember = await guild.members.fetch(target)
        if (target.bot) {
            interaction.reply({
                content: `Failed to mute ${targetMember}: bots cannot be server muted.`,
                flags: [MessageFlags.Ephemeral],
            })
            return
        }
        if (targetMember.permissions.has('Administrator')) {
            interaction.reply({
                content: `Failed to mute ${targetMember}: administrators cannot be server muted.`,
                flags: [MessageFlags.Ephemeral],
            })
            return
        }
        const muteInfo = {
            mutingMember,
            targetMember,
            durationInMinutes,
            reason,
        }
        await this.muteUser(muteInfo, muteType)
        await announceMute(interaction.channel, muteInfo, muteType)
    }

    async muteUser(muteInfo: MuteInfo, muteType: MuteType): Promise<void> {
        if (muteType == MuteType.Text || muteType == MuteType.Both) {
            await this.muteService.muteText(muteInfo)
        }

        if (muteType == MuteType.Voice || muteType == MuteType.Both) {
            await this.muteService.muteVoice(muteInfo)
        }
    }
}

// Announce the mute publicly in the given channel. Not intended for logging.
async function announceMute(
    channel: TextBasedChannel | null,
    info: MuteInfo,
    muteType: MuteType
) {
    if (!channel?.isSendable()) return

    let muteTypeString

    switch (muteType) {
        case MuteType.Voice:
            muteTypeString = 'voice'
            break
        case MuteType.Text:
            muteTypeString = 'text'
            break
        case MuteType.Both:
            muteTypeString = 'voice and text'
            break
    }

    const text = new TextDisplayBuilder().setContent(
        `${info.targetMember.toString()} was ${muteTypeString} muted for ${getDurationText(info.durationInMinutes)}`
    )
    const separator = new SeparatorBuilder()
        .setDivider(true)
        .setSpacing(SeparatorSpacingSize.Small)
    const footer = new TextDisplayBuilder().setContent(
        subtext(`User ID: ${info.targetMember.id}`)
    )

    const container = new ContainerBuilder()
        .addTextDisplayComponents(text)
        .addSeparatorComponents(separator)
        .addTextDisplayComponents(footer)

    channel.send({
        components: [container],
        flags: MessageFlags.IsComponentsV2,
    })
}
