import { Module } from '@spraxium/common';
import { SimpleModule } from './modules/simple/simple.module';

@Module({
    imports: [SimpleModule]
})
export class AppModule {}
