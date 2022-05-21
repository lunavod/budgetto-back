import '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class CreatePurchaseItemDto {
  @IsString()
  name: string

  @IsNumber()
  sum: number

  tags: string[]
}
