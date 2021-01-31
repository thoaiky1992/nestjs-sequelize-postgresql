import { Model } from 'sequelize-typescript';
import { User } from '../users/user.model';
export declare class ProfileUser extends Model<ProfileUser> {
    address: string;
    phone: number;
    userId: number;
    user: User;
}
