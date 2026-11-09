import { PvApiService } from '../pvApi/pvApi.service'
import { MemberLeaveListener } from './memberLeaveListener'
import { Module } from '@spraxium/common'

@Module({
  listeners: [MemberLeaveListener],
  providers: [PvApiService]
})
export class ListenersModule {}
