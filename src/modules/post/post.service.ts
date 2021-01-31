import { Injectable, Inject, Scope } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import { Post } from './post.model';
import { REQUEST } from '@nestjs/core';
import { Model } from 'sequelize-typescript';
import {Sequelize} from "sequelize";
import { SequelizeModelService } from '../../library/crud/sequelize.model.service';
import { Request } from 'express';
import { CrudRequest } from '@nestjsx/crud';
import {PostDto} from "./post.dto";

@Injectable({ scope: Scope.REQUEST })
export class PostsService extends SequelizeModelService<Post> {
  constructor(
    @InjectModel(Post)
      model: Post & typeof Model,
      sequelize: Sequelize,
      @Inject(REQUEST) request: Request,
  ) {
    super(model, sequelize, request);
  }

  async createOne(req: CrudRequest, dto: PostDto): Promise<Post> {
    dto.userId = this.request.user['id'];
    return super.createOne(req, dto);
  }
}
