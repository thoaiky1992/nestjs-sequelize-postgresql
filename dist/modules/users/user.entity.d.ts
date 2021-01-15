import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    name: string;
    email: string;
    password: string;
    created_at: Date;
    getRoom(): string;
}
