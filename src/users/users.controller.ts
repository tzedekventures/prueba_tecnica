import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ListDto } from 'src/common/dto/list.dto'


@Controller('users')
export class UsersController
{
    constructor(private readonly usersService: UsersService) { }


    @Post()
    public async create(@Body() createUserDto: CreateUserDto)
    {
        return await this.usersService.create(createUserDto)
    }


    @Get()
    public async findAll(@Query() listDto: ListDto)
    {
        return await this.usersService.findAll(listDto)
    }


    @Get(':id')
    public async findOne(@Param('id') id: string)
    {
        return await this.usersService.findOne(id)
    }


    @Patch(':id')
    public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto)
    {
        return await this.usersService.update(id, updateUserDto)
    }


    @Delete(':id')
    public async remove(@Param('id') id: string)
    {
        return await this.usersService.remove(id)
    }
}
