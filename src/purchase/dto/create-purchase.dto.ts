import '@nestjs/swagger'
import { IsNumber, IsString, IsUUID } from 'class-validator'

export class CreatePurchaseDto {
  @IsString()
  name: string

  @IsNumber()
  sum: number

  @IsUUID()
  storeId: string
}
