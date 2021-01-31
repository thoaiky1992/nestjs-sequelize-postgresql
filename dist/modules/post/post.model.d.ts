import { Model } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { CategoryModel } from "../category/category.model";
export declare class Post extends Model<Post> {
    title: string;
    description: string;
    image: string;
    content: string;
    createdAt: Date;
    userId: number;
    user: User;
    categoryId: number;
    category: CategoryModel;
}
