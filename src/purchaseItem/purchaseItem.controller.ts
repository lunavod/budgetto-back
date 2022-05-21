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
import '@nestjs/swagger'
import { Prisma, User } from '@prisma/client'
import { omit } from 'lodash'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { GetUser } from 'src/auth/user.decorator'

import { CreatePurchaseItemDto } from './dto/create-purchaseItem.dto'
import { UpdatePurchaseItemDto } from './dto/update-purchaseItem.dto'
import { PurchaseItemService } from './purchaseItem.service'

@Controller()
export class PurchaseItemController {
  constructor(private readonly purchaseItemService: PurchaseItemService) {}

  /**
   * Test test test test
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createPurchaseItemDto: CreatePurchaseItemDto,
    @GetUser() user: User,
    @Param('purchaseId') purchaseId: string,
  ) {
    return this.purchaseItemService.create({
      ...createPurchaseItemDto,
      userId: user.id,
      purchaseId,
      tags: {
        connect: createPurchaseItemDto.tags.map((t) => ({ id: t })),
      },
    })
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser() user: User) {
    return this.purchaseItemService.findAll(user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.purchaseItemService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePurchaseItemDto: UpdatePurchaseItemDto,
  ) {
    const data: Prisma.PurchaseItemUncheckedUpdateInput = {
      ...omit(updatePurchaseItemDto, 'tags'),
    }
    if (updatePurchaseItemDto.tags)
      data.tags = {
        connect: updatePurchaseItemDto.tags.map((t) => ({ id: t })),
      }

    return this.purchaseItemService.update(id, data)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.purchaseItemService.remove(id)
  }
}
