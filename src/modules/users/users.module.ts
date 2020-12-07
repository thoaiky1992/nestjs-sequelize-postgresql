import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './user.controller';
import { Sequelize } from 'sequelize';
import { User } from './user.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,],
  exports: [UsersService],
})
export class UsersModule {}
