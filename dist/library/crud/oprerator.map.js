"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialOperatorMap = exports.operatorMap = void 0;
const sequelize_1 = require("sequelize");
exports.operatorMap = {
    $eq: sequelize_1.Op.eq,
    $ne: sequelize_1.Op.ne,
    $gt: sequelize_1.Op.gt,
    $lt: sequelize_1.Op.lt,
    $gte: sequelize_1.Op.gte,
    $lte: sequelize_1.Op.lte,
    $starts: sequelize_1.Op.startsWith,
    $ends: sequelize_1.Op.endsWith,
    $cont: sequelize_1.Op.iLike,
    $excl: sequelize_1.Op.notLike,
    $in: sequelize_1.Op.in,
    $notin: sequelize_1.Op.notIn,
    $between: sequelize_1.Op.between,
    $is: sequelize_1.Op.is,
    $any: sequelize_1.Op.any,
    $contL: sequelize_1.Op.contains,
};
exports.specialOperatorMap = {
    $or: sequelize_1.Op.or,
    $and: sequelize_1.Op.and,
};
//# sourceMappingURL=oprerator.map.js.map