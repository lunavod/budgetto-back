import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PurchaseItemService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PurchaseItemUncheckedCreateInput) {
    return this.prisma.purchaseItem.create({ data })
  }

  findAll(userId?: string) {
    const where: Prisma.PurchaseItemWhereInput = {}
    if (userId) where.userId = userId

    return this.prisma.purchaseItem.findMany({ where })
  }

  findOne(id: string) {
    return this.prisma.purchaseItem.findUnique({ where: { id } })
  }

  update(id: string, data: Prisma.PurchaseItemUncheckedUpdateInput) {
    return this.prisma.purchaseItem.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.purchaseItem.delete({ where: { id } })
  }
}
