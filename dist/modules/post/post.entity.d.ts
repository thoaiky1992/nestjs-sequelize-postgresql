import { Model } from 'sequelize-typescript';
import { User } from '../users/user.entity';
export declare class Post extends Model<Post> {
    title: string;
    body: string;
    createdAt: Date;
    userId: number;
    user: User;
}
