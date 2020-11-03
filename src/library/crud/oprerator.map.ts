import {Op as Operator} from "sequelize";

export const operatorMap = {
  $eq: Operator.eq,
  $ne: Operator.ne,
  $gt: Operator.gt,
  $lt: Operator.lt,
  $gte: Operator.gte,
  $lte: Operator.lte,
  $starts: Operator.startsWith,
  $ends: Operator.endsWith,
  $cont: Operator.iLike,
  $excl: Operator.notLike,
  $in: Operator.in,
  $notin: Operator.notIn,
  $between: Operator.between,
  $is: Operator.is,
  $any: Operator.any,
  $contL: Operator.contains,
};


export const specialOperatorMap = {
  $or: Operator.or,
  $and: Operator.and,
}
