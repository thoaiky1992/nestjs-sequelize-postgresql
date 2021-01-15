import { ExtractJwt, Strategy, JwtFromRequestFunction } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from 'dotenv';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/users/user.entity';
import { JwtService } from '@nestjs/jwt';
config();


export const cookieExtractor: JwtFromRequestFunction = (req) => {
    let token = null;
    if (req && req.signedCookies) token = req.signedCookies['jwt'];
    return token;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User) protected model: typeof User, private jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                cookieExtractor,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.MAIN_JWT_TOKEN,
            passReqToCallback: false
        });
    }

    async validate(payload) {
        console.log(payload);
        
        const user = await this.model.findByPk(payload.id);
        return user;
    }
}