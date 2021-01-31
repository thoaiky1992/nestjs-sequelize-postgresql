import { CrudController } from '@nestjsx/crud';
import { PostsService } from './post.service';
import { Post as PostEntity } from './post.model';
import { Sequelize } from 'sequelize';
export declare class PostsController implements CrudController<PostEntity> {
    service: PostsService;
    private sequelize;
    constructor(service: PostsService, sequelize: Sequelize);
    uploadFile(files: any): {
        location: string;
    };
}
