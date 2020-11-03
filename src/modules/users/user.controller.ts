import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrudRequest, ParsedRequest, CrudRequestInterceptor, Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { FindOptions } from 'sequelize/types';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@ApiTags('USERS')
@Crud({
    model:{
        type: UserDto
    }
})
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService){}
}
