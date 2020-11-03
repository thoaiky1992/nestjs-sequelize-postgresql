import { Table, Column, Model, DataType, AutoIncrement , PrimaryKey } from 'sequelize-typescript';

@Table({
    tableName: 'users',
    underscored: true,
    timestamps: true
})
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column
    created_at: Date;
}
