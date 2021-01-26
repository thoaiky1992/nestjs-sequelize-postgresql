"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateJSONFilter = exports.parseRelationship = exports.setWhereValue = void 0;
const oprerator_map_1 = require("./oprerator.map");
function setWhereValue(object, filterOption) {
    object.where = {
        [filterOption.field]: {
            [oprerator_map_1.operatorMap[filterOption.operator]]: filterOption.operator === '$contL' ? filterOption.value.split(',') : filterOption.value,
        },
    };
    return object;
}
exports.setWhereValue = setWhereValue;
function parseRelationship(relationship, filterOption) {
    const result = {};
    const nestedRelationships = relationship.split('.');
    if (nestedRelationships.length <= 0) {
        result.association = relationship;
        if (filterOption) {
            setWhereValue(result, filterOption);
        }
    }
    else {
        let obj = result;
        nestedRelationships.forEach((item, level) => {
            if (level > 0) {
                obj.include = [{}];
                obj = obj.include[0];
            }
            obj.association = item;
        });
        if (filterOption) {
            setWhereValue(obj, filterOption);
        }
    }
    return result;
}
exports.parseRelationship = parseRelationship;
function translateJSONFilter(jsonFilter) {
    const filter = {};
    const fields = Object.keys(jsonFilter);
    fields.forEach(function (field) {
        if (Object.keys(oprerator_map_1.specialOperatorMap).includes(field)) {
            filter[oprerator_map_1.specialOperatorMap[field]] = jsonFilter[field].map(translateJSONFilter);
        }
        else if (jsonFilter[field] && typeof jsonFilter[field] !== 'object') {
            filter[field] = jsonFilter[field];
        }
        else {
            const operators = Object.keys(jsonFilter[field]);
            filter[field] = filter[field] || {};
            operators.forEach(operator => {
                filter[field][oprerator_map_1.operatorMap[operator]] = jsonFilter[field][operator];
            });
        }
    });
    return filter;
}
exports.translateJSONFilter = translateJSONFilter;
//# sourceMappingURL=helper.js.map