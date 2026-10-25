import { Module } from '@spraxium/common';
import { ExampleModule, SettingsModule } from './modules';

@Module({
    imports: [
        ExampleModule,
        SettingsModule
    ]
})
export class AppModule {}
