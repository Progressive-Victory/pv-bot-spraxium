import { PvApiService } from './pvApi.service'
import { Global, Module } from '@spraxium/common'

@Global()
@Module({
    providers: [PvApiService],
    exports: [PvApiService],
})
export class PvApiModule {}
