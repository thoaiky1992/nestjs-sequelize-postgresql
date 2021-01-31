import {
    Table,
    Column,
    Model,
    DataType,
} from 'sequelize-typescript';


@Table({
    tableName: 'categories',
    underscored: true,
    timestamps: true
})
export class CategoryModel extends Model<CategoryModel> {
    @Column({
        type: DataType.STRING,
    })
    name: string;
}
