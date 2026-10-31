import { ExampleCommand } from './commands/example.command'
import { ExampleHandler } from './handlers/example-command.handler'
import { Module } from '@spraxium/common'

@Module({
    commands: [ExampleCommand],
    handlers: [ExampleHandler],
})
export class ExampleModule {}
