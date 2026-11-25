import { PvApiModule } from '../pvApi/pvApi.module'
import {
    MemberJoinListener,
    MemberLeaveListener,
} from './listeners/join-leave.listener'
import { Module } from '@spraxium/common'

@Module({
    listeners: [MemberJoinListener, MemberLeaveListener],
    imports: [PvApiModule],
})
export class LogsModule {}
