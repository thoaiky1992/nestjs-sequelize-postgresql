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
exports.JwtStrategy = exports.cookieExtractor = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const dotenv_1 = require("dotenv");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../modules/users/user.model");
const jwt_1 = require("@nestjs/jwt");
dotenv_1.config();
exports.cookieExtractor = (req) => {
    let token = null;
    if (req && req.signedCookies)
        token = req.signedCookies['jwt'];
    return token;
};
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(model, jwtService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                exports.cookieExtractor,
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.MAIN_JWT_TOKEN,
            passReqToCallback: false
        });
        this.model = model;
        this.jwtService = jwtService;
    }
    async validate(payload) {
        const user = await this.model.findByPk(payload.id);
        return user;
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map