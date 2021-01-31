

import { User } from './user.model';
import { UserDto } from './user.dto';

import { Injectable, Inject, Scope } from '@nestjs/common';
import { SequelizeModelService } from '../../library/crud/sequelize.model.service';
import { Sequelize } from 'sequelize';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { Model } from 'sequelize-typescript';

@Injectable()
export class UsersService extends SequelizeModelService<User> {
  constructor(
    @InjectModel(User)
      model: User & typeof Model,
      sequelize: Sequelize,
      @Inject(REQUEST) request: Request,
  ) {
    super(model, sequelize, request);
  }

  async findOneById(id):Promise<User>{
    return await this.model.scope('authenticate').findByPk(id);
  }

  async findOneByEmail(email):Promise<User>{
    return await this.model.scope('authenticate').findOne({
      where: {
        email
      }
    });
  }

  async create(user:UserDto):Promise<User>{
    return await this.model.scope('authenticate').createOne(UserDto);
  }
}
