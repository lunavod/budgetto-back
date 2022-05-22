import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma.module'
import { ProductModule } from './product/product.module'
import { PurchaseModule } from './purchase/purchase.module'
import { PurchaseItemModule } from './purchaseItem/purchaseItem.module'
import routes from './routes'
import { StoreModule } from './store/store.module'
import { TagModule } from './tag/tag.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    PrismaModule,
    RouterModule.register(routes),
    AuthModule,
    UsersModule,
    StoreModule,
    PurchaseModule,
    PurchaseItemModule,
    TagModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
