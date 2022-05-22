import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { reply } from 'alice-renderer'
import { OauthService } from 'src/oauth/oauth.service'

import { AliceService } from './alice.service'
import { IApiRequest } from './types/request'

const RussianNouns = require('russian-nouns-js')

@Controller()
export class AliceController {
  constructor(
    private readonly aliceService: AliceService,
    private oauth: OauthService,
  ) {}

  @Post()
  async findAll(@Body() body: IApiRequest) {
    const { request, session, version } = body

    let response = reply`...`

    if (!session.user?.access_token) {
      response.directives = {
        start_account_linking: {},
      }
    } else {
      const user = await this.oauth.getUser(session.user.access_token)
      const nlu = request.nlu.intents['purchase.add']
      if (nlu) {
        const shop = nlu.slots.shop.value as string
        const price = +nlu.slots.howMuch.value
        const purchase = await this.aliceService.addPurchase(user, shop, price)
        response = reply`Добавлена покупка на ${purchase.sum} рублей`
      }
    }

    // response.end_session = true

    return {
      version,
      session,
      response,
      session_state: {},
    }
  }
}
