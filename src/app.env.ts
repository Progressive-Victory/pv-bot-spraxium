import { Env, EnvSchema, IsString, SpraxiumBaseEnv } from '@spraxium/env'

@EnvSchema()
export class AppEnv extends SpraxiumBaseEnv {
    @Env('PV_DISCORD_TOKEN')
    @IsString()
    PV_DISCORD_TOKEN!: string

    @Env('PV_API_URL')
    @IsString()
    PV_API_URL!: string
}
