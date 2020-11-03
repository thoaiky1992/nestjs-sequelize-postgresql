

import { User } from './user.entity';
import { UserDto } from './user.dto';

import { Injectable, Inject, Scope } from '@nestjs/common';
import { SequelizeModelService } from '../../library/crud/sequelize.model.service';
import { Sequelize } from 'sequelize';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { Model } from 'sequelize-typescript';

@Injectable({ scope: Scope.REQUEST })
export class UsersService extends SequelizeModelService<User> {
  constructor(
    @InjectModel(User)
      model: User & typeof Model,
      sequelize: Sequelize,
      @Inject(REQUEST) request: Request,
  ) {
    super(model, sequelize, request);
  }
}
