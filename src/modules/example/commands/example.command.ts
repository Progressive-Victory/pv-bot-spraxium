import { SlashCommand, SlashOption } from '@spraxium/common';

@SlashCommand({ name: 'example', description: 'Your Mother'})
export class ExampleCommand {
    @SlashOption.String('mother', {
        description: 'Which of our mothers',
        required: true,
        choices: [
            {name: "Yours", value: "Your"},
            {name: "Mine", value: "My"}
        ]
    })
    build() {}
}