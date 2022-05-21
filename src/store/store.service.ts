import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.StoreUncheckedCreateInput) {
    return this.prisma.store.create({ data })
  }

  findAll(userId?: string) {
    const where: Prisma.StoreWhereInput = {}
    if (userId) where.userId = userId

    return this.prisma.store.findMany({ where })
  }

  findOne(id: string) {
    return this.prisma.store.findUnique({ where: { id } })
  }

  update(id: string, data: Prisma.StoreUncheckedUpdateInput) {
    return this.prisma.store.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.store.delete({ where: { id } })
  }
}
