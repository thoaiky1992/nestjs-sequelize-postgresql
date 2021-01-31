import { User } from './user.model';
import { UserDto } from './user.dto';
import { SequelizeModelService } from '../../library/crud/sequelize.model.service';
import { Sequelize } from 'sequelize';
import { Request } from 'express';
import { Model } from 'sequelize-typescript';
export declare class UsersService extends SequelizeModelService<User> {
    constructor(model: User & typeof Model, sequelize: Sequelize, request: Request);
    findOneById(id: any): Promise<User>;
    findOneByEmail(email: any): Promise<User>;
    create(user: UserDto): Promise<User>;
}
