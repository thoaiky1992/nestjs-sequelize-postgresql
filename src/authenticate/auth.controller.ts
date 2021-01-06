import { Controller, Body, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from 'src/modules/users/user.dto';
import { authDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express'

@ApiTags('Authenticate')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() payload:authDto,@Res() req: Response ) {
        return await this.authService.login(payload,req);
    }

    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }
}