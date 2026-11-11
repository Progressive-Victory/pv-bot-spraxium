import { ExampleModule } from './modules/example/example.module'
import { ListenersModule } from './modules/listeners/listeners.module'
import { MuteModule } from './modules/mute/mute.module'
import { Module } from '@spraxium/common'

@Module({
    imports: [ExampleModule, MuteModule, ListenersModule],
})
export class AppModule {}
