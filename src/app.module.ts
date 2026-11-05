import { ExampleModule } from './modules/example/example.module'
import { Module } from '@spraxium/common'
import { RepeatMessagesModule } from './modules/repeat-messages/repeat-messages.module';

@Module({
    imports: [ExampleModule, RepeatMessagesModule],
})
export class AppModule {}
