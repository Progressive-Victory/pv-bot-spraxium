import { Module } from '@spraxium/common';
import { ExampleModule } from './modules/example/example.module';

@Module({
    imports: [ExampleModule]
})
export class AppModule {}
