"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const post_module_1 = require("./modules/post/post.module");
const users_module_1 = require("./modules/users/users.module");
const dotenv_1 = require("dotenv");
const auth_module_1 = require("./authenticate/auth.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const category_module_1 = require("./modules/category/category.module");
dotenv_1.config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'public'),
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.MAIN_DB_HOST,
                port: Number(process.env.MAIN_DB_PORT),
                username: process.env.MAIN_DB_USER,
                password: process.env.MAIN_DB_PASSWORD,
                database: process.env.MAIN_DB_NAME,
                autoLoadModels: true,
                synchronize: true,
            }),
            users_module_1.UsersModule,
            post_module_1.PostsModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map