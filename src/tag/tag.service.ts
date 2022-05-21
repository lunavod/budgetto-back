import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TagUncheckedCreateInput) {
    return this.prisma.tag.create({ data })
  }

  findAll(userId?: string) {
    const where: Prisma.TagWhereInput = {}
    if (userId) where.userId = userId

    return this.prisma.tag.findMany({ where })
  }

  findOne(id: string) {
    return this.prisma.tag.findUnique({ where: { id } })
  }

  update(id: string, data: Prisma.TagUncheckedUpdateInput) {
    return this.prisma.tag.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.tag.delete({ where: { id } })
  }
}
