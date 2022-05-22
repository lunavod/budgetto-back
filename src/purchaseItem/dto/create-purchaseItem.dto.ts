import '@nestjs/swagger'
import { IsString, IsNumber, IsUUID } from 'class-validator'

export class CreatePurchaseItemDto {
  @IsString()
  name: string

  @IsNumber()
  price: number

  @IsUUID()
  productId: string

  tags: string[]
}
