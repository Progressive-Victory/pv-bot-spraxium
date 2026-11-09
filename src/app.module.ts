import { ListenersModule } from './modules/listeners/listeners.module'
import { Module } from '@spraxium/common'

@Module({
    imports: [ListenersModule],
})
export class AppModule {}
