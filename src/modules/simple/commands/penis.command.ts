import { SlashCommand, SlashOption } from '@spraxium/common';

@SlashCommand({ name: 'penis', description: 'suck me good and hard through my jorts'})
export class PenisCommand {
    @SlashOption.String('mother', {
        description: 'mother to sex',
        required: true,
        choices: [
            {name: "Yours", value: "yours"},
            {name: "Mine", value: "mine"}
        ]
    })
    build() {}
}