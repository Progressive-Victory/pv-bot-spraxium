import { developmentConfig } from './config/development.config'
import { defineConfig } from '@spraxium/core'

export default defineConfig((env) => ({
    debug: env.isNeutral,
    plugins: [],
    dev: developmentConfig,
}))
