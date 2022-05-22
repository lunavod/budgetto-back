import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma.service'
import { v4 } from 'uuid'

@Injectable()
export class OauthService {
  constructor(private prisma: PrismaService, private auth: AuthService) {}

  validate(login: string, password: string) {
    return this.auth.validateUser(login, password)
  }

  async initialize(userId: string) {
    return await this.prisma.aliceOauth.create({
      data: {
        userId,
        code: v4(),
      },
    })
  }

  async generateToken(code: string) {
    await this.prisma.aliceOauth.updateMany({
      where: { code },
      data: { token: v4() },
    })
    return this.prisma.aliceOauth.findFirst({ where: { code } })
  }

  async getUser(token: string) {
    const data = await this.prisma.aliceOauth.findFirst({
      where: { token },
      include: { user: true },
    })
    return data.user
  }
}
