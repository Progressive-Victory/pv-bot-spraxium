import { SlashCommand, SlashOption } from '@spraxium/common'

@SlashCommand({ name: 'ban', description: 'Ban a user' })
export class BanCommand {
    @SlashOption.String('reason', {
        description: 'Why are you banning this user?',
        required: true,
        minLength: 1,
        maxLength: 300
    })
    @SlashOption.Boolean('delete-message', {
        description: 'Should user messages be deleted?',
        required: true,
        choices: [
            { name: 'Yes', value: true },
            { name: 'No', value: false },
        ],
    })
    build() {}
}
