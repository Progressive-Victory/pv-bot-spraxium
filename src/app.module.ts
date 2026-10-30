import { ExampleModule } from './modules/example/example.module'
import { Module } from '@spraxium/common'

@Module({
    imports: [ExampleModule],
})
export class AppModule {}
