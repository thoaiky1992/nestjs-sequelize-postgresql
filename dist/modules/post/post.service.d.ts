import { Post } from './post.entity';
import { Model } from 'sequelize-typescript';
import { Sequelize } from "sequelize";
import { SequelizeModelService } from '../../library/crud/sequelize.model.service';
import { Request } from 'express';
export declare class PostsService extends SequelizeModelService<Post> {
    constructor(model: Post & typeof Model, sequelize: Sequelize, request: Request);
}
