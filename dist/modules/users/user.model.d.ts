import { Model } from 'sequelize-typescript';
import { ProfileUser } from "../profile_user/profile_user.model";
export declare class User extends Model<User> {
    name: string;
    email: string;
    password: string;
    created_at: Date;
    profile: ProfileUser;
    getRoom(): string;
}
