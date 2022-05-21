---
to: src/<%=name%>/<%=name%>.service.ts
---
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class <%=Name%>Service {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.<%=Name%>UncheckedCreateInput) {
    return this.prisma.<%=name%>.create({ data })
  }

  findAll(userId?: string) {
    const where: Prisma.<%=Name%>WhereInput = {}
    if (userId) where.userId = userId

    return this.prisma.<%=name%>.findMany({ where })
  }

  findOne(id: string) {
    return this.prisma.<%=name%>.findUnique({ where: { id } })
  }

  update(id: string, data: Prisma.<%=Name%>UncheckedUpdateInput) {
    return this.prisma.<%=name%>.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.<%=name%>.delete({ where: { id } })
  }
}
