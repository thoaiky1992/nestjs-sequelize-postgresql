"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const user_entity_1 = require("./user.entity");
const user_dto_1 = require("./user.dto");
const common_1 = require("@nestjs/common");
const sequelize_model_service_1 = require("../../library/crud/sequelize.model.service");
const sequelize_1 = require("sequelize");
const core_1 = require("@nestjs/core");
const sequelize_2 = require("@nestjs/sequelize");
let UsersService = class UsersService extends sequelize_model_service_1.SequelizeModelService {
    constructor(model, sequelize, request) {
        super(model, sequelize, request);
    }
    async findOneById(id) {
        return await this.model.scope('authenticate').findByPk(id);
    }
    async findOneByEmail(email) {
        return await this.model.scope('authenticate').findOne({
            where: {
                email
            }
        });
    }
    async create(user) {
        return await this.model.scope('authenticate').createOne(user_dto_1.UserDto);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_2.InjectModel(user_entity_1.User)),
    __param(2, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, sequelize_1.Sequelize, Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map