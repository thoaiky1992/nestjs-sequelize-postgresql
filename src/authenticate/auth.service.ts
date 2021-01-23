import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { UserDto } from 'src/modules/users/user.dto';
import { authDto } from './auth.dto';
import { User } from 'src/modules/users/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private sequelize: Sequelize,
        private jwtService: JwtService
    ) { }

    async validateUser(authDto: authDto) {
        // find if user exist with this email
        const user = await this.userModel.scope('authenticate').findOne({
            where: {
                email: authDto.email
            }
        });
        if (!user) {
            return null;
        }
        // find if user password match
        const match = await this.comparePassword(authDto.password, user.password);
        if (!match) {
            return null;
        }
        return user.toJSON();
    }

    public async login(payload: authDto, res: Response) {
        const user = await this.validateUser(payload);
        if(!user){
            throw new UnauthorizedException('Unauthorized');
        }
        const token = await this.generateToken(user);
        // return { user, token };
        res.cookie('jwt', token, {
            httpOnly: true,
            signed: true,
            sameSite: 'strict',
        }).send({ token })
        return {token};
    }

    public async create(user: UserDto) {
        // hash the password
        user.password = await this.hashPassword(user.password);

        // create the user
        const newUser = await this.userModel.scope('authenticate').create(user);

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newUser['dataValues'];

        // generate token
        const token = await this.generateToken(result);

        // return the user and the token
        return { user: result, token };

    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
        // return enteredPassword === dbPassword;
    }

}