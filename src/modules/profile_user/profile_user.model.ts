import { Table, Column, Model, DataType, ForeignKey, BelongsTo , AutoIncrement } from 'sequelize-typescript';
import { User } from '../users/user.model';


@Table({
    tableName: 'profile_user',
    underscored: true,
    timestamps: true
})
export class ProfileUser extends Model<ProfileUser> {
    @Column({
        type: DataType.STRING,
    })
    address: string;

    @Column({
        type: DataType.INTEGER,
    })
    phone: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
