import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { config } from 'dotenv';
config();

@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.register({
            secret: process.env.MAIN_JWT_TOKEN,
            signOptions: { expiresIn: process.env.MAIN_JWT_EXPIRE },
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    controllers: [AuthController],
    exports:[
        PassportModule,
        AuthService,
    ]
})
export class AuthModule { }