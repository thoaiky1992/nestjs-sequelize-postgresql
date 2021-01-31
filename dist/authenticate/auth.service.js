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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../modules/users/users.service");
const user_dto_1 = require("../modules/users/user.dto");
const user_model_1 = require("../modules/users/user.model");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
let AuthService = class AuthService {
    constructor(userModel, sequelize, jwtService) {
        this.userModel = userModel;
        this.sequelize = sequelize;
        this.jwtService = jwtService;
    }
    async validateUser(authDto) {
        const user = await this.userModel.scope('authenticate').findOne({
            where: {
                email: authDto.email
            }
        });
        if (!user) {
            return null;
        }
        const match = await this.comparePassword(authDto.password, user.password);
        if (!match) {
            return null;
        }
        return user.toJSON();
    }
    async login(payload, res) {
        const user = await this.validateUser(payload);
        if (!user) {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
        const token = await this.generateToken(user);
        res.cookie('jwt', token, {
            httpOnly: true,
            signed: true,
            sameSite: 'strict',
            maxAge: (1000 * 60 * 60 * 24) * 60,
        }).send({ token });
        return { token };
    }
    async create(user) {
        user.password = await this.hashPassword(user.password);
        const newUser = await this.userModel.scope('authenticate').create(user);
        const _a = newUser['dataValues'], { password } = _a, result = __rest(_a, ["password"]);
        const token = await this.generateToken(result);
        return { user: result, token };
    }
    async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }
    async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [Object, sequelize_2.Sequelize,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map