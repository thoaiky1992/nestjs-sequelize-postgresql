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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("@nestjsx/crud");
const jwt_auth_guard_1 = require("../../authenticate/jwt-auth.guard");
const sequelize_1 = require("sequelize");
const category_dto_1 = require("./category.dto");
const category_service_1 = require("./category.service");
const swagger_1 = require("@nestjs/swagger");
let CategoryController = class CategoryController {
    constructor(service, sequelize) {
        this.service = service;
        this.sequelize = sequelize;
    }
};
CategoryController = __decorate([
    swagger_1.ApiTags('Category'),
    crud_1.Crud({
        model: {
            type: category_dto_1.CategoryDto
        }
    }),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService, sequelize_1.Sequelize])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map