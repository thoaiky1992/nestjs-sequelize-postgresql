import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { config } from 'dotenv';
import { User } from 'src/modules/users/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
config();

@Global()
@Module({
    imports: [
        
        SequelizeModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: process.env.MAIN_JWT_TOKEN,
            signOptions: { expiresIn: '30 days' },
        }),
        UsersModule,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    controllers: [AuthController],
    exports:[
        AuthService,
        JwtModule
    ]
})
export class AuthModule { }