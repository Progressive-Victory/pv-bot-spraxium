import { ExampleModule, SettingsModule, MuteModule } from './modules'
import { Module } from '@spraxium/common'

@Module({
    imports: [ExampleModule, SettingsModule, MuteModule],
})
export class AppModule {}
