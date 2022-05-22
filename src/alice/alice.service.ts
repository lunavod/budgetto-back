import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AliceService {
  constructor(private prisma: PrismaService) {}

  async addPurchase(user: User, shopName: string, price: number) {
    const shops = await this.prisma.store.findMany({
      where: { userId: user.id },
    })

    let shop = shops.find((shop) => shop.name.toLowerCase() === shopName)
    if (!shop) {
      shop = await this.prisma.store.create({
        data: {
          userId: user.id,
          name: shopName,
        },
      })
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        sum: price,
        storeId: shop.id,
        userId: user.id,
      },
    })

    return purchase
  }
}
