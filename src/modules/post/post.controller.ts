import {Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors,} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PostsService } from './post.service';
import { Post as PostEntity } from './post.model';
import { PostDto } from './post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authenticate/jwt-auth.guard';
import { Sequelize } from 'sequelize';
import { join } from 'path';
import * as fs from 'fs'
import {FileFieldsInterceptor} from "@nestjs/platform-express";

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
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'file', maxCount: 1},
        {name: 'image', maxCount: 1},
    ]))
    uploadFile(@UploadedFiles() files) {
        console.log(files)
        const file = files[Object.keys(files)[0]][0]
        const filename = Date.now() + '-' + file.originalname.trim().replace(new RegExp(' ', 'g'), '');
        fs.writeFileSync(join(__dirname, '..', '..', '..', 'public', 'uploads',
            'images', filename), file.buffer)
        console.log(file);

        return { location: join('/', 'uploads', 'images', filename) }
    }
}
