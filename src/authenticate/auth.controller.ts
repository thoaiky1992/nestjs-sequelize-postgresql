import { Controller, Body, Post, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/modules/users/user.dto';
import { authDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express'
import {JwtAuthGuard} from "./jwt-auth.guard";
import { Request } from 'express';

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

    @UseGuards(JwtAuthGuard)
    @Post('check')
    async check(@Req() req: Request) {
        return true;
    }

}