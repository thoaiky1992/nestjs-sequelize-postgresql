import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PostsService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authenticate/jwt-auth.guard';
import { Sequelize } from 'sequelize';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { join } from 'path';
import * as fs from 'fs';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('POSTS')
@Crud({
    model: {
        type: PostDto
    }
})
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController implements CrudController<PostEntity> {
    constructor(public service: PostsService, private sequelize: Sequelize) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadFile(@UploadedFile() file) {
        const filename = Date.now() + '-' + file.originalname.trim().replace(new RegExp(' ', 'g'), '');
        fs.writeFileSync(join(__dirname, '..', '..', '..', 'public', 'uploads',
            'images', filename), file.buffer)
        console.log(file);

        return { location: join('/', 'uploads', 'images', filename) }
    }
}
