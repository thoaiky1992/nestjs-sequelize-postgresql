import { Model } from 'sequelize-typescript';
import { Sequelize } from "sequelize";
import { SequelizeModelService } from '../../library/crud/sequelize.model.service';
import { Request } from 'express';
import { CategoryModel } from "./category.model";
export declare class CategoryService extends SequelizeModelService<CategoryModel> {
    constructor(model: CategoryModel & typeof Model, sequelize: Sequelize, request: Request);
}
