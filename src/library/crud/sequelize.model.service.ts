import {
  CreateManyDto,
  CrudRequest,
  CrudService,
} from '@nestjsx/crud';
import {
  QueryFilter,
} from '@nestjsx/crud-request';
import {
  isArrayFull,
  isObject,
} from '@nestjsx/util';
import {Model} from "sequelize-typescript";
import {UpdateOptions, CreateOptions, FindOptions, Sequelize, Op} from "sequelize";
import { operatorMap } from "./oprerator.map"
import {parseRelationship,  translateJSONFilter} from "./helper";
import { Request } from 'express';
import { merge } from "lodash";
import {UnauthorizedException} from "@nestjs/common";


export class SequelizeModelService<T extends Model> extends CrudService<T> {
  protected createOptions: any = {};
  protected updateOptions: any = {};
  protected findOptions: any = {};

  constructor(public model: any, public sequelize: Sequelize, protected request?: Request) {
    super();
  }


  async createMany(req: CrudRequest, dto: CreateManyDto): Promise<T[]> {
    if (!isObject(dto) || !isArrayFull(dto.bulk)) {
      this.throwBadRequestException(`Empty data. Nothing to save.`);
    }
    return this.sequelize.transaction(async t => {
      const transactionHost = {
        transaction: t,
        ...this.createOptions,
      };
      let instances = await this.model.bulkCreate(dto.bulk, transactionHost);
      instances = await this.getMoreInfoOfInstance(instances, req, t, true);
      return this.convertToPlainObject(instances);
    });
  }

  async createOne(req: CrudRequest, dto: any): Promise<T> {
    return this.sequelize.transaction(async t => {
      const transactionHost = {
        transaction: t,
        ...this.createOptions,
      };
      let instance = await this.model.create(dto, transactionHost);
      instance = await this.getMoreInfoOfInstance(instance, req, t);
      return this.convertToPlainObject(instance);
    });
  }

  async deleteOne(req: CrudRequest): Promise<void | T> {
    return this.sequelize.transaction(async t => {
      const transactionHost = { transaction: t };
      const instance = await this.model.findOne(
        this.convertCrudRequestToFindOptions(req)
      );
      return instance.destroy(transactionHost);
    });
  }

  async getMany(req: CrudRequest): Promise<T[]> {
    if (this.request.query['count']) {
      return this.findManyAndCountAll(req);
    } else {
      return this.findMany(req);
    }
  }

  async getOne(req: CrudRequest): Promise<T> {
    return this.findOne(req);
  }

  async replaceOne(req: CrudRequest, dto: any): Promise<T> {
    return this.sequelize.transaction(async t => {
      const transactionHost = {
        transaction: t,
        ...this.updateOptions,
      };
      let instance = await this.model.findOne(
        this.convertCrudRequestToFindOptions(req)
      );
      await instance.update(dto, transactionHost);
      instance = await this.getMoreInfoOfInstance(instance, req, t);
      return this.convertToPlainObject(instance);
    });
  }

  async updateOne(req: CrudRequest, dto: any): Promise<T> {
    return this.replaceOne(req, dto);
  }

  protected async getMoreInfoOfInstance(instance: any, req: CrudRequest, transaction = undefined, many = false): Promise<any> {
    const findOptions = this.convertCrudRequestToFindOptions(req);
    if (transaction) {
      findOptions.transaction = transaction
    }
    let result;
    if (many) {
      findOptions.where = findOptions.where || {};
      const { where } = findOptions;
      where['id'] = {
        [Op.in]: instance.map(item => item.id)
      }
      result = await this.model.findAll(instance.id, findOptions);
    } else {
      result = await this.model.findByPk(instance.id, findOptions);
    }
    return result;
  }


  protected async findManyAndCountAll(req: CrudRequest): Promise<T[]> {
    const instances = await this.model.findAndCountAll(
      this.convertCrudRequestToFindOptions(req)
    );
    return this.convertToPlainObject(instances);
  }

  protected async findMany(req: CrudRequest): Promise<T[]> {
    const instances = await this.model.findAll(
      this.convertCrudRequestToFindOptions(req)
    );
    return this.convertToPlainObject(instances);
  }

  protected async findOne(req: CrudRequest): Promise<T> {
    const instance = await this.model.findOne(
      this.convertCrudRequestToFindOptions(req, {subQuery: true})
    );
    return this.convertToPlainObject(instance);
  }

  protected convertToPlainObject(object: T | T[]) {
    return JSON.parse(JSON.stringify(object));
  }

  protected convertCrudRequestToFindOptions(req: CrudRequest, extraOptions = {}): FindOptions {
    const options: FindOptions = {
      where: {},
      ...extraOptions,
      ...this.findOptions
    };

    if (req.parsed.join.length > 0) {
      options.include = req.parsed.join.map(item => parseRelationship(item.field));
    }

    if (req.parsed.fields.length > 0) {
      options.attributes = req.parsed.fields;
    }
    if (this.request.query.jsonFilter) {
      const jsonFilter: any = String(this.request.query.jsonFilter);
      const objectFilter = JSON.parse(jsonFilter);
      const where = translateJSONFilter(objectFilter);
      options.where = merge(where, options.where);
    } else {
      function mapParamsFilterWithOp(item: QueryFilter) {
        const fieldParts = item.field.split('.');
        if (fieldParts.length > 1) {
          const field = fieldParts.pop();
          if (!Array.isArray(options.include)) {
            options.include = [];
          }
          options.include.push(parseRelationship(
            fieldParts.join('.'),
            {
              field,
              operator: item.operator,
              value: item.value
            }
          ))
        } else {
          options.where[item.field] = options.where[item.field] || {};
          options.where[item.field][operatorMap[item.operator]] = item.operator === '$contL' ? String(item.value).split(',') : item.value;
        }
      }
      if (req.parsed.paramsFilter.length > 0) {
        req.parsed.paramsFilter.map(mapParamsFilterWithOp)
      }
      if (req.parsed.filter.length > 0) {
        req.parsed.filter.map(mapParamsFilterWithOp)
      }
      if (req.parsed.or.length > 0) {
        options['where'][Op.or] = req.parsed.or.map(item => ({
          [item.field]: {
            [operatorMap[item.operator]]: item.value
          }
        }));
      }
    }

    if (req.parsed.limit) {
      options.limit = req.parsed.limit;
    }
    if (req.parsed.offset) {
      options.offset = req.parsed.offset;
    }
    if (req.parsed.sort.length > 0) {
      options.order = req.parsed.sort.map(item => [item.field, item.order])
    }
    console.log(options);

    return options;
  }
}
