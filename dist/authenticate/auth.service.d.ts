import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/modules/users/user.dto';
import { authDto } from './auth.dto';
import { User } from 'src/modules/users/user.entity';
import { Sequelize } from 'sequelize';
import { Response } from 'express';
export declare class AuthService {
    private userModel;
    private sequelize;
    private jwtService;
    constructor(userModel: typeof User, sequelize: Sequelize, jwtService: JwtService);
    validateUser(authDto: authDto): Promise<object>;
    login(payload: authDto, res: Response): Promise<{
        token: string;
    }>;
    create(user: UserDto): Promise<{
        user: any;
        token: string;
    }>;
    private generateToken;
    private hashPassword;
    private comparePassword;
}
