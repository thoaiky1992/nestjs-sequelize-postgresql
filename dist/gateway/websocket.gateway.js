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
exports.StaffGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const jwt = require("jsonwebtoken");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../modules/users/user.model");
const system_socket_1 = require("./system.socket");
let StaffGateway = class StaffGateway {
    constructor(user) {
        this.user = user;
    }
    afterInit(server) {
        system_socket_1.System.socket = server;
    }
    async handleConnection(client) {
        var _a, _b, _c, _d;
        let token = (_b = (_a = client === null || client === void 0 ? void 0 : client.request) === null || _a === void 0 ? void 0 : _a.signedCookies) === null || _b === void 0 ? void 0 : _b.jwt;
        token = token || ((_d = (_c = client.handshake.headers) === null || _c === void 0 ? void 0 : _c.authorization) === null || _d === void 0 ? void 0 : _d.split(' ')[1]);
        if (token) {
            try {
                const payload = jwt.verify(token, process.env.COOKIE_SECRETE);
                const user = await this.user.findByPk(payload.id);
                if (!user) {
                    return false;
                }
                client.join(user.getRoom());
            }
            catch (ex) {
                console.log(ex);
                return false;
            }
        }
    }
};
StaffGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __param(0, sequelize_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], StaffGateway);
exports.StaffGateway = StaffGateway;
//# sourceMappingURL=websocket.gateway.js.map