"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeModelService = void 0;
const crud_1 = require("@nestjsx/crud");
const util_1 = require("@nestjsx/util");
const sequelize_1 = require("sequelize");
const oprerator_map_1 = require("./oprerator.map");
const helper_1 = require("./helper");
const lodash_1 = require("lodash");
class SequelizeModelService extends crud_1.CrudService {
    constructor(model, sequelize, request) {
        super();
        this.model = model;
        this.sequelize = sequelize;
        this.request = request;
        this.createOptions = {};
        this.updateOptions = {};
        this.findOptions = {};
    }
    async createMany(req, dto) {
        if (!util_1.isObject(dto) || !util_1.isArrayFull(dto.bulk)) {
            this.throwBadRequestException(`Empty data. Nothing to save.`);
        }
        return this.sequelize.transaction(async (t) => {
            const transactionHost = Object.assign({ transaction: t }, this.createOptions);
            let instances = await this.model.bulkCreate(dto.bulk, transactionHost);
            instances = await this.getMoreInfoOfInstance(instances, req, t, true);
            return this.convertToPlainObject(instances);
        });
    }
    async createOne(req, dto) {
        return this.sequelize.transaction(async (t) => {
            const transactionHost = Object.assign({ transaction: t }, this.createOptions);
            let instance = await this.model.create(dto, transactionHost);
            instance = await this.getMoreInfoOfInstance(instance, req, t);
            return this.convertToPlainObject(instance);
        });
    }
    async deleteOne(req) {
        return this.sequelize.transaction(async (t) => {
            const transactionHost = { transaction: t };
            const instance = await this.model.findOne(this.convertCrudRequestToFindOptions(req));
            return instance.destroy(transactionHost);
        });
    }
    async getMany(req) {
        if (this.request.query['count']) {
            return this.findManyAndCountAll(req);
        }
        else {
            return this.findMany(req);
        }
    }
    async getOne(req) {
        return this.findOne(req);
    }
    async replaceOne(req, dto) {
        return this.sequelize.transaction(async (t) => {
            const transactionHost = Object.assign({ transaction: t }, this.updateOptions);
            let instance = await this.model.findOne(this.convertCrudRequestToFindOptions(req));
            await instance.update(dto, transactionHost);
            instance = await this.getMoreInfoOfInstance(instance, req, t);
            return this.convertToPlainObject(instance);
        });
    }
    async updateOne(req, dto) {
        return this.replaceOne(req, dto);
    }
    async getMoreInfoOfInstance(instance, req, transaction = undefined, many = false) {
        const findOptions = this.convertCrudRequestToFindOptions(req);
        if (transaction) {
            findOptions.transaction = transaction;
        }
        let result;
        if (many) {
            findOptions.where = findOptions.where || {};
            const { where } = findOptions;
            where['id'] = {
                [sequelize_1.Op.in]: instance.map(item => item.id)
            };
            result = await this.model.findAll(instance.id, findOptions);
        }
        else {
            result = await this.model.findByPk(instance.id, findOptions);
        }
        return result;
    }
    async findManyAndCountAll(req) {
        const instances = await this.model.findAndCountAll(this.convertCrudRequestToFindOptions(req));
        return this.convertToPlainObject(instances);
    }
    async findMany(req) {
        const instances = await this.model.findAll(this.convertCrudRequestToFindOptions(req));
        return this.convertToPlainObject(instances);
    }
    async findOne(req) {
        const instance = await this.model.findOne(this.convertCrudRequestToFindOptions(req, { subQuery: true }));
        return this.convertToPlainObject(instance);
    }
    convertToPlainObject(object) {
        return JSON.parse(JSON.stringify(object));
    }
    convertCrudRequestToFindOptions(req, extraOptions = {}) {
        const options = Object.assign(Object.assign({ where: {} }, extraOptions), this.findOptions);
        if (req.parsed.join.length > 0) {
            options.include = req.parsed.join.map(item => helper_1.parseRelationship(item.field));
        }
        if (req.parsed.fields.length > 0) {
            options.attributes = req.parsed.fields;
        }
        if (this.request.query.jsonFilter) {
            const jsonFilter = String(this.request.query.jsonFilter);
            const objectFilter = JSON.parse(jsonFilter);
            const where = helper_1.translateJSONFilter(objectFilter);
            options.where = lodash_1.merge(where, options.where);
        }
        else {
            function mapParamsFilterWithOp(item) {
                const fieldParts = item.field.split('.');
                if (fieldParts.length > 1) {
                    const field = fieldParts.pop();
                    if (!Array.isArray(options.include)) {
                        options.include = [];
                    }
                    options.include.push(helper_1.parseRelationship(fieldParts.join('.'), {
                        field,
                        operator: item.operator,
                        value: item.value
                    }));
                }
                else {
                    options.where[item.field] = options.where[item.field] || {};
                    options.where[item.field][oprerator_map_1.operatorMap[item.operator]] = item.operator === '$contL' ? String(item.value).split(',') : item.value;
                }
            }
            if (req.parsed.paramsFilter.length > 0) {
                req.parsed.paramsFilter.map(mapParamsFilterWithOp);
            }
            if (req.parsed.filter.length > 0) {
                req.parsed.filter.map(mapParamsFilterWithOp);
            }
            if (req.parsed.or.length > 0) {
                options['where'][sequelize_1.Op.or] = req.parsed.or.map(item => ({
                    [item.field]: {
                        [oprerator_map_1.operatorMap[item.operator]]: item.value
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
            options.order = req.parsed.sort.map(item => [item.field, item.order]);
        }
        console.log(options);
        return options;
    }
}
exports.SequelizeModelService = SequelizeModelService;
//# sourceMappingURL=sequelize.model.service.js.map