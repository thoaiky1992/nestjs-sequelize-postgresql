import { CreateManyDto, CrudRequest, CrudService } from '@nestjsx/crud';
import { Model } from "sequelize-typescript";
import { FindOptions, Sequelize } from "sequelize";
import { Request } from 'express';
export declare class SequelizeModelService<T extends Model> extends CrudService<T> {
    model: any;
    sequelize: Sequelize;
    protected request?: Request;
    protected createOptions: any;
    protected updateOptions: any;
    protected findOptions: any;
    constructor(model: any, sequelize: Sequelize, request?: Request);
    createMany(req: CrudRequest, dto: CreateManyDto): Promise<T[]>;
    createOne(req: CrudRequest, dto: any): Promise<T>;
    deleteOne(req: CrudRequest): Promise<void | T>;
    getMany(req: CrudRequest): Promise<T[]>;
    getOne(req: CrudRequest): Promise<T>;
    replaceOne(req: CrudRequest, dto: any): Promise<T>;
    updateOne(req: CrudRequest, dto: any): Promise<T>;
    protected getMoreInfoOfInstance(instance: any, req: CrudRequest, transaction?: any, many?: boolean): Promise<any>;
    protected findManyAndCountAll(req: CrudRequest): Promise<T[]>;
    protected findMany(req: CrudRequest): Promise<T[]>;
    protected findOne(req: CrudRequest): Promise<T>;
    protected convertToPlainObject(object: T | T[]): any;
    protected convertCrudRequestToFindOptions(req: CrudRequest, extraOptions?: {}): FindOptions;
}
