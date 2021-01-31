import { Strategy, JwtFromRequestFunction } from 'passport-jwt';
import { User } from 'src/modules/users/user.model';
import { JwtService } from '@nestjs/jwt';
export declare const cookieExtractor: JwtFromRequestFunction;
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    protected model: typeof User;
    private jwtService;
    constructor(model: typeof User, jwtService: JwtService);
    validate(payload: any): Promise<User>;
}
export {};
