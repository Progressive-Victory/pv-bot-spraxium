import { Module } from '@spraxium/common';
import { ExampleModule, SettingsModule, MuteModule } from './modules';

@Module({
    imports: [
        ExampleModule,
        SettingsModule,
        MuteModule,
    ]
})
export class AppModule {}
