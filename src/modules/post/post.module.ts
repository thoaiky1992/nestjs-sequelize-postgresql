import { Module } from '@nestjs/common';
// Service
import { PostsService } from './post.service';
// Controller
import { PostsController } from './post.controller';
//Entity ( Model )
import { Post } from './post.model';

import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/authenticate/auth.module';
import {ProfileUser} from "../profile_user/profile_user.model";


@Module({
  imports: [
    SequelizeModule.forFeature([Post, ProfileUser]),
  ],
  providers: [PostsService,],
  exports: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
