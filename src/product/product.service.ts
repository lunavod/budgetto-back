import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProductUncheckedCreateInput) {
    return this.prisma.product.create({ data })
  }

  findAll(storeId?: string) {
    const where: Prisma.ProductWhereInput = {}
    if (storeId) where.storeId = storeId

    return this.prisma.product.findMany({ where })
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } })
  }

  update(id: string, data: Prisma.ProductUncheckedUpdateInput) {
    return this.prisma.product.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } })
  }
}
