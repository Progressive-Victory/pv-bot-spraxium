import {
    ExampleModule,
    SettingsModule,
    MuteModule,
    LogsModule,
} from './modules'
import { Module } from '@spraxium/common'

@Module({
    imports: [ExampleModule, LogsModule, MuteModule, SettingsModule],
})
export class AppModule {}
