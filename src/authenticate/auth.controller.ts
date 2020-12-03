import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from 'src/modules/users/user.dto';
import { authDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authenticate')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() payload:authDto) {
        return await this.authService.login(payload);
    }

    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }
}