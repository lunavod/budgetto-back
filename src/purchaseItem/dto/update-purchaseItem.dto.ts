import { PartialType } from '@nestjs/swagger'

import { CreatePurchaseItemDto } from './create-purchaseItem.dto'

export class UpdatePurchaseItemDto extends PartialType(CreatePurchaseItemDto) {}
