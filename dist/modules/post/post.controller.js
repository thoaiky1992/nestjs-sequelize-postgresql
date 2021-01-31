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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("@nestjsx/crud");
const post_service_1 = require("./post.service");
const post_dto_1 = require("./post.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../authenticate/jwt-auth.guard");
const sequelize_1 = require("sequelize");
const path_1 = require("path");
const fs = require("fs");
const platform_express_1 = require("@nestjs/platform-express");
let PostsController = class PostsController {
    constructor(service, sequelize) {
        this.service = service;
        this.sequelize = sequelize;
    }
    uploadFile(files) {
        console.log(files);
        const file = files[Object.keys(files)[0]][0];
        const filename = Date.now() + '-' + file.originalname.trim().replace(new RegExp(' ', 'g'), '');
        fs.writeFileSync(path_1.join(__dirname, '..', '..', '..', 'public', 'uploads', 'images', filename), file.buffer);
        console.log(file);
        return { location: path_1.join('/', 'uploads', 'images', filename) };
    }
};
__decorate([
    common_1.Post('upload'),
    common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([
        { name: 'file', maxCount: 1 },
        { name: 'image', maxCount: 1 },
    ])),
    __param(0, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "uploadFile", null);
PostsController = __decorate([
    swagger_1.ApiTags('POSTS'),
    crud_1.Crud({
        model: {
            type: post_dto_1.PostDto
        }
    }),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('posts'),
    __metadata("design:paramtypes", [post_service_1.PostsService, sequelize_1.Sequelize])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=post.controller.js.map