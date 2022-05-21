---
to: src/<%=name%>/<%=name%>.controller.ts
---
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { GetUser } from 'src/auth/user.decorator'

import { Create<%=Name%>Dto } from './dto/create-<%=name%>.dto'
import { Update<%=Name%>Dto } from './dto/update-<%=name%>.dto'
import { <%=Name%>Service } from './<%=name%>.service'

@Controller()
export class <%=Name%>Controller {
  constructor(private readonly <%=name%>Service: <%=Name%>Service) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() create<%=Name%>Dto: Create<%=Name%>Dto, @GetUser() user: User) {
    return this.<%=name%>Service.create({ ...create<%=Name%>Dto, userId: user.id })
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@GetUser() user: User) {
    return this.<%=name%>Service.findAll(user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.<%=name%>Service.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() update<%=Name%>Dto: Update<%=Name%>Dto) {
    return this.<%=name%>Service.update(id, update<%=Name%>Dto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.<%=name%>Service.remove(id)
  }
}
