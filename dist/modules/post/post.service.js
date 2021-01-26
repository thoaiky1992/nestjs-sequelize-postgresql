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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const post_entity_1 = require("./post.entity");
const core_1 = require("@nestjs/core");
const sequelize_2 = require("sequelize");
const sequelize_model_service_1 = require("../../library/crud/sequelize.model.service");
let PostsService = class PostsService extends sequelize_model_service_1.SequelizeModelService {
    constructor(model, sequelize, request) {
        super(model, sequelize, request);
    }
};
PostsService = __decorate([
    common_1.Injectable({ scope: common_1.Scope.REQUEST }),
    __param(0, sequelize_1.InjectModel(post_entity_1.Post)),
    __param(2, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, sequelize_2.Sequelize, Object])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=post.service.js.map