import { AppEnv } from './app.env'
import { AppModule } from './app.module'
import { SpraxiumFactory } from '@spraxium/core'
import { EnvValidator } from '@spraxium/env'
import { Logger } from '@spraxium/logger'
import { GatewayIntentBits } from 'discord.js'

async function main(): Promise<void> {
    const logger = new Logger('Main')
    const environment = EnvValidator.validate(AppEnv)
    const app = await SpraxiumFactory.create({ token: environment.token })

    app.useModule(AppModule)
    app.provide(AppEnv, environment)
    // Guilds and GuildMessages are the default intents
    app.intents([
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        // needed to view vc join/leave events
        GatewayIntentBits.GuildVoiceStates,
        // needed to view audit log events
        GatewayIntentBits.GuildModeration,
    ])

    logger.info('Starting application...')
    await app.listen()
}

main()
