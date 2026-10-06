import { Module } from "@spraxium/common";
import { ExampleCommand } from "./commands/example.command";
import { ExampleHandler } from "./handlers/example-command.handler";

@Module({
    commands: [ExampleCommand],
    handlers: [ExampleHandler]
})
export class ExampleModule {}