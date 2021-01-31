import { Post } from './post.model';
import { Model } from 'sequelize-typescript';
import { Sequelize } from "sequelize";
import { SequelizeModelService } from '../../library/crud/sequelize.model.service';
import { Request } from 'express';
import { CrudRequest } from '@nestjsx/crud';
import { PostDto } from "./post.dto";
export declare class PostsService extends SequelizeModelService<Post> {
    constructor(model: Post & typeof Model, sequelize: Sequelize, request: Request);
    createOne(req: CrudRequest, dto: PostDto): Promise<Post>;
}
