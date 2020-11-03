import {Includeable} from 'sequelize'
import {operatorMap, specialOperatorMap} from "./oprerator.map";
import {WhereOptions, Op} from 'sequelize';

export interface FilterOption {
  field: string;
  operator: string;
  value: string;
}

export function setWhereValue(object: any, filterOption: FilterOption) {
  object.where = {
    [filterOption.field]: {
      [operatorMap[filterOption.operator]]: filterOption.operator === '$contL' ? filterOption.value.split(',') : filterOption.value,
    },
  };
  return object;
}

export function parseRelationship(relationship: string, filterOption?: FilterOption): Includeable {
  const result: Includeable = {};
  const nestedRelationships = relationship.split('.');
  if (nestedRelationships.length <= 0) {
    result.association = relationship;
    if (filterOption) {
      setWhereValue(result, filterOption);
    }
  } else {
    let obj: any = result;
    nestedRelationships.forEach((item, level) => {
      if (level > 0) {
        obj.include = [{}];
        obj = obj.include[0];
      }
      obj.association = item;
    })
    if (filterOption) {
      setWhereValue(obj, filterOption);
    }
  }
  return result;
}

export function translateJSONFilter(jsonFilter: object): WhereOptions {
  const filter: WhereOptions = {};
  const fields = Object.keys(jsonFilter);
  fields.forEach(function (field) {
    if (Object.keys(specialOperatorMap).includes(field)) {
      filter[specialOperatorMap[field]] = jsonFilter[field].map(translateJSONFilter);
    } else if (jsonFilter[field] && typeof jsonFilter[field] !== 'object') {
      filter[field] = jsonFilter[field];
    } else {
      const operators = Object.keys(jsonFilter[field])
      filter[field] = filter[field] || {};
      operators.forEach(operator => {
        filter[field][operatorMap[operator]] = jsonFilter[field][operator];
      })
    }
  });
  return filter;
}
