import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import {CategoryModel} from "../category/category.model";


@Table({
    tableName: 'posts',
    underscored: true,
    timestamps: true
})
export class Post extends Model<Post> {
    @Column({
        type: DataType.STRING,
    })
    title: string;

    @Column({
        type: DataType.STRING,
    })
    description: string;

    @Column({
        type: DataType.STRING,
    })
    image: string;

    @Column({
        type: DataType.TEXT,
    })
    content: string;

    @Column({
        type: DataType.DATE,
    })
    createdAt: Date;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => CategoryModel)
    @Column({
        type: DataType.INTEGER,
    })
    categoryId: number;

    @BelongsTo(() => CategoryModel)
    category: CategoryModel;
}
