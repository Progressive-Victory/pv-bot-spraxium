import { ExampleModule } from './modules/example/example.module'
import { MuteModule } from './modules/mute/mute.module'
import { Module } from '@spraxium/common'

@Module({
    imports: [ExampleModule, MuteModule],
})
export class AppModule {}
