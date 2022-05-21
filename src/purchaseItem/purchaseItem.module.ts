import { Module } from '@nestjs/common'

import { PurchaseItemController } from './purchaseItem.controller'
import { PurchaseItemService } from './purchaseItem.service'

@Module({
  controllers: [PurchaseItemController],
  providers: [PurchaseItemService],
})
export class PurchaseItemModule {}
