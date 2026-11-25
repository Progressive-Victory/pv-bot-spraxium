import { PvApiService } from '../../pvApi/pvApi.service'
import { Events, Listener, On } from '@spraxium/common'
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ContainerBuilder,
    GuildMember,
    GuildMemberFlags,
    heading,
    SectionBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    Snowflake,
    subtext,
    TextDisplayBuilder,
    ThumbnailBuilder,
    time,
    TimestampStyles,
    Colors,
    MessageFlags,
    bold,
    inlineCode,
} from 'discord.js'
import { DiscordUserStatus } from 'pv-contracts/data'
import { UpdateDiscordUserRequest } from 'pv-contracts/requests'
import z from 'zod'

const zSettingsResponse = z.object({ data: z.string().nonempty() })
type SettingsResponse = z.infer<typeof zSettingsResponse>

enum WelcomeColors {
    Unwelcomed = Colors.Blue,
    Welcomed = Colors.Green,
    Left = Colors.Red,
}

const sharedComponents = {
    footer: (userId: Snowflake, id?: number) => {
        const display = new TextDisplayBuilder().setContent(
            subtext(`User ID: ${userId}`)
        )
        if (id) display.setId(id)
        return display
    },
    separator: new SeparatorBuilder()
        .setDivider(true)
        .setSpacing(SeparatorSpacingSize.Small),
}

@Listener(Events.GuildMemberAdd)
export class MemberJoinListener {
    constructor(private readonly pvApiService: PvApiService) {}

    @On()
    async onJoin(member: GuildMember) {
        const { guild } = member

        const welcomeChannelRes = await this.pvApiService.get<SettingsResponse>(
            this.pvApiService.routes.setting('welcome_channel_id'),
            zSettingsResponse
        )
        const welcomeChannelId = welcomeChannelRes?.data

        const welcomeChannel = await guild.channels.fetch(welcomeChannelId)
        if (!welcomeChannel?.isSendable()) return

        const joinedAt = member.joinedAt ?? new Date()

        const message = [
            heading('Member Joined'),
            `${member.toString()} ${member.user.username}`,
            `Joined: ${time(joinedAt, TimestampStyles.RelativeTime)}`,
        ]
        if (member.flags.has(GuildMemberFlags.DidRejoin))
            message.push('(Rejoin)')

        const display = new TextDisplayBuilder().setContent(message.join('\n'))

        const avatarUrl = member.displayAvatarURL({ forceStatic: true })
        const thumbnail = new ThumbnailBuilder()
            .setURL(avatarUrl)
            .setDescription(`Display avatar for ${member.user.username}`)

        const section = new SectionBuilder()
            .addTextDisplayComponents(display)
            .setThumbnailAccessory(thumbnail)

        const welcomeButton = new ButtonBuilder()
            .setCustomId('welcomed')
            .setLabel('Confirm Welcome')
            .setStyle(ButtonStyle.Secondary)
        const actions = new ActionRowBuilder<ButtonBuilder>().addComponents(
            welcomeButton
        )

        const container = new ContainerBuilder()
            .addSectionComponents(section)
            .addSeparatorComponents(sharedComponents.separator)
            .addTextDisplayComponents(sharedComponents.footer(member.id))
            .addActionRowComponents(actions)
            .setAccentColor(WelcomeColors.Unwelcomed)

        welcomeChannel.send({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
        })
    }
}

@Listener(Events.GuildMemberRemove)
export class MemberLeaveListener {
    constructor(private readonly pvApiService: PvApiService) {}

    @On()
    async onLeave(member: GuildMember) {
        const { guild } = member

        const userLeftBody: UpdateDiscordUserRequest = {
            status: DiscordUserStatus.Left,
        }
        try {
            await this.pvApiService.patch(
                this.pvApiService.routes.discordUser(member.id),
                {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userLeftBody),
                }
            )
        } catch {
            console.log(
                `Could not update discord user status to 'left' for user '${member.user.username}'.`
            )
        }

        const leaveChannelIdRes = await this.pvApiService.get<SettingsResponse>(
            this.pvApiService.routes.setting('leave_log_channel_id'),
            zSettingsResponse
        )
        const leaveChannelId = leaveChannelIdRes.data
        const leaveChannel = await guild.channels.fetch(leaveChannelId)
        if (!leaveChannel?.isSendable()) return

        const avatarUrl = member.user.displayAvatarURL({ forceStatic: true })
        const joinedAt = member.joinedAt
            ? time(member.joinedAt, TimestampStyles.FullDateShortTime)
            : inlineCode('not cached')
        const message = [
            heading('Member Left'),
            `${bold(member.displayName)} ${member.user.username}`,
            `Joined: ${joinedAt}`,
        ]

        if (member.pending) message.push("*Didn't agree to rules")

        const thumbnail = new ThumbnailBuilder().setURL(avatarUrl)
        const display = new TextDisplayBuilder().setContent(message.join('\n'))

        const container = new ContainerBuilder()
            .addSectionComponents(
                new SectionBuilder()
                    .addTextDisplayComponents(display)
                    .setThumbnailAccessory(thumbnail)
            )
            .addSeparatorComponents(sharedComponents.separator)
            .addTextDisplayComponents(sharedComponents.footer(member.id))
            .setAccentColor(WelcomeColors.Left)

        leaveChannel.send({
            flags: MessageFlags.IsComponentsV2,
            components: [container],
        })
    }
}
