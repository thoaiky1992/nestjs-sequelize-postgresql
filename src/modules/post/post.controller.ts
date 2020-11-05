import { Controller, Get, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrudRequest, ParsedRequest, CrudRequestInterceptor, Crud, CrudController } from '@nestjsx/crud';
import { PostsService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './post.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtStrategy } from '../../authenticate/jwt.strategy';


@ApiTags('POSTS')
@UseGuards(AuthGuard('jwt'))
@Crud({
    model:{
        type: PostDto
    }
})
@Controller('posts')
export class PostsController implements CrudController<PostEntity> {
    constructor(public service: PostsService){}

    
    @Get('test')
    test() {
        return 1;
    }
}
