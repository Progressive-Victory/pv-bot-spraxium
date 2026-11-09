import { SlashCommand, SlashOption } from '@spraxium/common'
import { PermissionFlagsBits } from 'discord.js'

export enum MuteType {
    Voice,
    Text,
    Both,
}

const DURATION_OPTIONS = [
    { name: '3 minutes', value: 3 },
    { name: '10 minutes', value: 10 },
    { name: '30 minutes', value: 30 },
    { name: '1 hour', value: 60 },
    { name: '6 hours', value: 360 },
    { name: '1 day', value: 1440 },
]

export function getDurationText(duration: number): string {
    return (
        DURATION_OPTIONS.find(({ value }) => value === duration)?.name ??
        `${duration} minutes`
    )
}

@SlashCommand({
    name: 'mute',
    description: 'Mute a user in a voice chat, text channel, or both',
    defaultMemberPermissions: PermissionFlagsBits.MuteMembers,
})
export class MuteCommand {
    @SlashOption.User('target', {
        description: 'Which user would you like to mute?',
        required: true,
    })
    @SlashOption.Integer('duration', {
        description: 'How long should this user be muted?',
        required: true,
        choices: DURATION_OPTIONS,
    })
    @SlashOption.Integer('type', {
        description: 'What should this user be muted from?',
        required: true,
        choices: [
            { name: 'voice', value: MuteType.Voice },
            // TODO
            // { name: "text", value: MuteType.Text },
            // { name: "both", value: MuteType.Both },
        ],
    })
    @SlashOption.String('reason', {
        description: 'Why are you muting this user?',
        required: true,
    })
    build() {}
}
