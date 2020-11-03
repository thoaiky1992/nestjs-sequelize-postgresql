import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrudRequest, ParsedRequest, CrudRequestInterceptor, Crud, CrudController } from '@nestjsx/crud';
import { PostsService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './post.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindOptions } from 'sequelize/types';

@ApiTags('POSTS')
@Crud({
    model:{
        type: PostDto
    }
})
@Controller('posts')
export class PostsController implements CrudController<PostEntity> {
    constructor(public service: PostsService){}
}
