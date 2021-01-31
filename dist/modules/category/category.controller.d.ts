import { CrudController } from '@nestjsx/crud';
import { Sequelize } from 'sequelize';
import { CategoryModel } from "./category.model";
import { CategoryService } from "./category.service";
export declare class CategoryController implements CrudController<CategoryModel> {
    service: CategoryService;
    private sequelize;
    constructor(service: CategoryService, sequelize: Sequelize);
}
