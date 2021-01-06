import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, DefaultScope, Scopes } from 'sequelize-typescript';

@DefaultScope(() => ({
    attributes: {
        exclude: ['password']
    },
}))
@Scopes(() => ({
    authenticate: {
        attributes: {
            include: ['password']
        },
    },
}))
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

    public getRoom() {
        return `user@${this.id}`;
    }
}
