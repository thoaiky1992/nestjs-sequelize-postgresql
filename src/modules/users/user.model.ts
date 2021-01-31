import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    DefaultScope,
    Scopes,
    HasOne
} from 'sequelize-typescript';
import {ProfileUser} from "../profile_user/profile_user.model";

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

    @HasOne(() => ProfileUser)
    profile: ProfileUser

    public getRoom() {
        return `user@${this.id}`;
    }
}
