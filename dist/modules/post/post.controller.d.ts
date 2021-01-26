import { CrudController } from '@nestjsx/crud';
import { PostsService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { Sequelize } from 'sequelize';
export declare class PostsController implements CrudController<PostEntity> {
    service: PostsService;
    private sequelize;
    constructor(service: PostsService, sequelize: Sequelize);
    uploadFile(file: any): {
        location: string;
    };
}
