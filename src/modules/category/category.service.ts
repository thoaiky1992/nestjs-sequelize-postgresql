import { Injectable, Inject, Scope } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import { REQUEST } from '@nestjs/core';
import { Model } from 'sequelize-typescript';
import {Sequelize} from "sequelize";
import { SequelizeModelService } from '../../library/crud/sequelize.model.service';
import { Request } from 'express';
import {CategoryModel} from "./category.model";

@Injectable({ scope: Scope.REQUEST })
export class CategoryService extends SequelizeModelService<CategoryModel> {
    constructor(
        @InjectModel(CategoryModel)
            model: CategoryModel & typeof Model,
        sequelize: Sequelize,
        @Inject(REQUEST) request: Request,
    ) {
        super(model, sequelize, request);
    }
}
