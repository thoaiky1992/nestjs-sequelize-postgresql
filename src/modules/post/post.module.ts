import { Module } from '@nestjs/common';
// Service
import { PostsService } from './post.service';
// Controller
import { PostsController } from './post.controller';
//Entity ( Model )
import { Post } from '../post/post.entity';

import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  imports: [
    SequelizeModule.forFeature([Post]),
  ],
  providers: [PostsService,],
  exports: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
