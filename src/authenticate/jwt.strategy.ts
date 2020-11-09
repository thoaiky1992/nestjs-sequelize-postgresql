import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './auth.dto';
import { config } from 'dotenv';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/users/user.entity';
import { Model } from 'sequelize';
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User) protected model: typeof User) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: process.env.MAIN_JWT_TOKEN,
        });
    }

    async validate(payload) {
        const user = await this.model.findByPk(payload.id);
        return user;
    }
}