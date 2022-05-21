import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.PurchaseUncheckedCreateInput) {
    return this.prisma.purchase.create({ data })
  }

  findAll(userId?: string) {
    const where: Prisma.PurchaseWhereInput = {}
    if (userId) where.userId = userId

    return this.prisma.purchase.findMany({ where })
  }

  findOne(id: string) {
    return this.prisma.purchase.findUnique({ where: { id } })
  }

  update(id: string, data: Prisma.PurchaseUncheckedUpdateInput) {
    return this.prisma.purchase.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.purchase.delete({ where: { id } })
  }
}
