import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrudRequest, ParsedRequest, CrudRequestInterceptor, Crud, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindOptions } from 'sequelize/types';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/authenticate/jwt-auth.guard';

@ApiTags('USERS')
@Crud({
    model:{
        type: UserDto
    }
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService){}
}
