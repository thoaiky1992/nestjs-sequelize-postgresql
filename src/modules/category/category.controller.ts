import {Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController } from '@nestjsx/crud';
import {JwtAuthGuard} from 'src/authenticate/jwt-auth.guard';
import {Sequelize} from 'sequelize';
import {CategoryModel} from "./category.model";
import {CategoryDto} from "./category.dto";
import {CategoryService} from "./category.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Category')
@Crud({
    model: {
        type: CategoryDto
    }
})
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController implements CrudController<CategoryModel> {
    constructor(public service: CategoryService, private sequelize: Sequelize) { }

}
