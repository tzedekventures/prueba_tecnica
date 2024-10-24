import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ListDto } from 'src/common/dto/list.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User, UserRole } from './schema/user.schema'
import { GetUser } from 'src/auth/decorators/get-user.decorator'


@Controller('users')
export class UsersController
{
    constructor(private readonly usersService: UsersService) { }


    @Post()
    @Auth(UserRole.ADMIN)
    public async create(@Body() createUserDto: CreateUserDto)
    {
        return await this.usersService.create(createUserDto)
    }


    @Get()
    @Auth(UserRole.ADMIN)
    public async findAll(@Query() listDto: ListDto)
    {
        return await this.usersService.findAll(listDto)
    }


    @Get(':id')
    @Auth(UserRole.ADMIN, UserRole.USER)
    public async findOne(@Param('id') id: string)
    {
        return await this.usersService.findOne(id)
    }


    @Patch(':id')
    @Auth(UserRole.ADMIN, UserRole.USER)
    public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @GetUser() user: User)
    {
        return await this.usersService.update(id, updateUserDto, user)
    }


    @Delete(':id')
    @Auth(UserRole.ADMIN, UserRole.USER)
    public async remove(@Param('id') id: string, @GetUser() user: User)
    {
        return await this.usersService.remove(id, user)
    }
}
