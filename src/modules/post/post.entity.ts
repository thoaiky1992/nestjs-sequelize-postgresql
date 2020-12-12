import { Table, Column, Model, DataType, ForeignKey, BelongsTo , AutoIncrement } from 'sequelize-typescript';
import { User } from '../users/user.entity';


@Table({
    tableName: 'posts',
    underscored: true,
    timestamps: true
})
export class Post extends Model<Post> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    body: string;

    @Column({
        type: DataType.DATE,
    })
    createdAt: Date;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
