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

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductService } from './product.service'

@ApiTags('products')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
    @Param('storeId') storeId: string,
  ) {
    const data: Prisma.ProductUncheckedCreateInput = {
      ...omit(createProductDto, 'tags'),
      userId: user.id,
      storeId,
    }

    if (createProductDto.tags)
      data.tags = {
        connect: createProductDto.tags.map((t) => ({ id: t })),
      }

    return this.productService.create(data)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Param('storeId') storeId: string) {
    return this.productService.findAll(storeId)
  }

  @ApiParam({ name: 'storeId', type: 'string' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id)
  }

  @ApiParam({ name: 'storeId', type: 'string' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const data: Prisma.ProductUncheckedUpdateInput = {
      ...omit(updateProductDto, 'tags'),
    }
    if (updateProductDto.tags)
      data.tags = {
        connect: updateProductDto.tags.map((t) => ({ id: t })),
      }
    return this.productService.update(id, data)
  }

  @ApiParam({ name: 'storeId', type: 'string' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(id)
  }
}
