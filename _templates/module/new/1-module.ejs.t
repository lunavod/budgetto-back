---
to: src/<%=name%>/<%=name%>.module.ts
---
import { Module } from '@nestjs/common'

import { <%=Name%>Controller } from './<%=name%>.controller'
import { <%=Name%>Service } from './<%=name%>.service'

@Module({
  controllers: [<%=Name%>Controller],
  providers: [<%=Name%>Service],
})
export class <%=Name%>Module {}
