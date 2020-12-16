import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PostsService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authenticate/jwt-auth.guard';
import { Sequelize } from 'sequelize';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';


@ApiTags('POSTS')
@Crud({
    model:{
        type: PostDto
    }
})
@Controller('posts')
export class PostsController implements CrudController<PostEntity> {
    constructor(public service: PostsService,private sequelize: Sequelize){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadFile(@UploadedFile() file) {
        console.log(file);
        
        return { location : '/uploaded/image/path/image.png' }
    }
}
