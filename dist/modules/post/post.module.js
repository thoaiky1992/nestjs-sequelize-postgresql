"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_controller_1 = require("./post.controller");
const post_model_1 = require("./post.model");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("../../authenticate/auth.module");
const profile_user_model_1 = require("../profile_user/profile_user.model");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    common_1.Module({
        imports: [
            sequelize_1.SequelizeModule.forFeature([post_model_1.Post, profile_user_model_1.ProfileUser]),
        ],
        providers: [post_service_1.PostsService,],
        exports: [post_service_1.PostsService],
        controllers: [post_controller_1.PostsController],
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=post.module.js.map