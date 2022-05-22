import { Controller, Get, Post, Body, Query, Redirect } from '@nestjs/common'

import { OauthService } from './oauth.service'

@Controller()
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post('token')
  async getCode(@Query('code') code: any) {
    const data = await this.oauthService.generateToken(code)
    return { access_token: data.token, expires_in: 4294967295 }
  }

  @Redirect()
  @Post('code')
  async createToken(
    @Body('username') username: string,
    @Body('password') password: string,
    @Query('state') state: string,
    @Query('redirect_uri') redirect_uri: string,
    @Query('client_id') client_id: string,
  ) {
    const user = await this.oauthService.validate(username, password)
    if (!user) throw new Error('User not found')

    const data = await this.oauthService.initialize(user.id)
    return {
      url:
        redirect_uri +
        '?' +
        new URLSearchParams({
          client_id,
          code: data.code,
          state,
        }),
    }
  }

  @Get('code')
  getToken(
    @Query('state') state: string,
    @Query('redirect_uri') redirect_uri: string,
    @Query('client_id') client_id: string,
  ) {
    return `
    <html>
    <head>
      <title>Auth</title>
    </head>
    <body>
    <form method="POST">
      <input type="hidden" value="${state}" name="state" />
      <input type="hidden" value="${client_id}" name="client_id" />
      <input type="hidden" value="${redirect_uri}" name="redirect_uri" />
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <div>
        <button type="submit">Auth!</button>
      </div>
    </form>
    `
  }
}
