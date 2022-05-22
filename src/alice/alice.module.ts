import { Module } from '@nestjs/common'
import { OauthModule } from 'src/oauth/oauth.module'

import { AliceController } from './alice.controller'
import { AliceService } from './alice.service'

@Module({
  imports: [OauthModule],
  controllers: [AliceController],
  providers: [AliceService],
})
export class AliceModule {}
