import { Module } from "@spraxium/common";
import { PenisCommand } from "./commands/penis.command";
import { PenisHandler } from "./handlers/penis-command.handler";

@Module({
    commands: [PenisCommand],
    handlers: [PenisHandler]
})
export class SimpleModule {}