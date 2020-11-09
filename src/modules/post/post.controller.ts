import { Controller, Get, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrudRequest, ParsedRequest, CrudRequestInterceptor, Crud, CrudController } from '@nestjsx/crud';
import { PostsService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authenticate/jwt-auth.guard';


@ApiTags('POSTS')
@Crud({
    model:{
        type: PostDto
    }
})
@ApiBearerAuth()
@Controller('posts')
export class PostsController implements CrudController<PostEntity> {
    constructor(public service: PostsService){}

}
