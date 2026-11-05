import { Module } from '@spraxium/common';
import { ModalService, PayloadService } from '@spraxium/components';
import { RepeatMessageHandler } from '../../components/repeat-messages/repeat-messages.handler'
import { RepeatMessagesCommandHandler } from '../../components/repeat-messages/repeat-messages.command-handler'
import { TestRepeatMessagesCommand } from '../../components/repeat-messages/repeat-messages.command'

@Module({
  commands: [TestRepeatMessagesCommand],
  providers: [ModalService, PayloadService],
  handlers: [RepeatMessageHandler, RepeatMessagesCommandHandler],
})
export class RepeatMessagesModule {}
