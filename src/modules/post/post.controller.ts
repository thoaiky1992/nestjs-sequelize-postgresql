import { Controller, Get, Inject, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrudRequest, ParsedRequest, CrudRequestInterceptor, Crud, CrudController } from '@nestjsx/crud';
import { PostsService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authenticate/jwt-auth.guard';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Sequelize } from 'sequelize';


@ApiTags('POSTS')
@Crud({
    model:{
        type: PostDto
    }
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController implements CrudController<PostEntity> {
    constructor(public service: PostsService,private sequelize: Sequelize){}

    @Get('test')
    async TestRequest(){
        return await this.sequelize.query('SELECT * FROM posts where id = 2',{ model: PostEntity});
    }
}
