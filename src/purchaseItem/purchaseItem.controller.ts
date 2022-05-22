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
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { Prisma, User } from '@prisma/client'
import { omit } from 'lodash'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { GetUser } from 'src/auth/user.decorator'

import { CreatePurchaseItemDto } from './dto/create-purchaseItem.dto'
import { UpdatePurchaseItemDto } from './dto/update-purchaseItem.dto'
import { PurchaseItemService } from './purchaseItem.service'

@ApiTags('purchaseItem')
@Controller()
export class PurchaseItemController {
  constructor(private readonly purchaseItemService: PurchaseItemService) {}

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
    })
  }

  @ApiParam({ name: 'purchaseId', type: 'string' })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser() user: User) {
    return this.purchaseItemService.findAll(user.id)
  }

  @ApiParam({ name: 'purchaseId', type: 'string' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.purchaseItemService.findOne(id)
  }

  @ApiParam({ name: 'purchaseId', type: 'string' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePurchaseItemDto: UpdatePurchaseItemDto,
  ) {
    return this.purchaseItemService.update(id, updatePurchaseItemDto)
  }

  @ApiParam({ name: 'purchaseId', type: 'string' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.purchaseItemService.remove(id)
  }
}
