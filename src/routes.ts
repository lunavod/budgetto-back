import { AliceModule } from './alice/alice.module'
import { AuthModule } from './auth/auth.module'
import { OauthModule } from './oauth/oauth.module'
import { ProductModule } from './product/product.module'
import { PurchaseModule } from './purchase/purchase.module'
import { PurchaseItemModule } from './purchaseItem/purchaseItem.module'
import { StoreModule } from './store/store.module'
import { TagModule } from './tag/tag.module'
import { UsersModule } from './users/users.module'
import { Router } from './utils/router'

const r = new Router()

r.resource('auth', AuthModule)
r.resource('users', UsersModule)
r.resource('alice', AliceModule)
r.resource('oauth', OauthModule)
r.resource('stores', StoreModule, (r) => {
  r.resource(':storeId/products', ProductModule)
})
r.resource('tags', TagModule)
r.resource('purchases', PurchaseModule, (r) => {
  r.resource(':purchaseId/items', PurchaseItemModule)
})

const routes = r.routes
export default routes
