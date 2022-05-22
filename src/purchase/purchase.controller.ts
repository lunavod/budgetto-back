import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { GetUser } from 'src/auth/user.decorator'

import { CreatePurchaseDto } from './dto/create-purchase.dto'
import { UpdatePurchaseDto } from './dto/update-purchase.dto'
import { PurchaseService } from './purchase.service'

@ApiTags('purchase')
@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPurchaseDto: CreatePurchaseDto, @GetUser() user: User) {
    return this.purchaseService.create({
      ...createPurchaseDto,
      userId: user.id,
    })
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser() user: User) {
    return this.purchaseService.findAll(user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchaseService.update(id, updatePurchaseDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(id)
  }
}
