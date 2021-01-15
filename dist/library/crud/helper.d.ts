import { Includeable } from 'sequelize';
import { WhereOptions } from 'sequelize';
export interface FilterOption {
    field: string;
    operator: string;
    value: string;
}
export declare function setWhereValue(object: any, filterOption: FilterOption): any;
export declare function parseRelationship(relationship: string, filterOption?: FilterOption): Includeable;
export declare function translateJSONFilter(jsonFilter: object): WhereOptions;
