import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schema/user.schema'
import { Model } from 'mongoose'
import { Res } from 'src/common/lib/res'
import { ListDto } from 'src/common/dto/list.dto'


@Injectable()
export class UsersService
{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


    public async create(createUserDto: CreateUserDto)
    {
        const profile = new this.userModel(createUserDto)
        return await profile.save()
    }


    public async findAll(listDto: ListDto)
    {
        const { page, limit } = listDto

        const data = await this.userModel
            .find()
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('author')
            .populate('tags')
            .exec()

        const count = await this.userModel
            .countDocuments()
            .exec()

        return Res.Format(data, count, page, limit)
    }


    public async findOne(id: string)
    {
        const user = await this.userModel.findById(id).exec()

        if (!user)
        {
            throw new NotFoundException(`user with id ${id} not found`)
        }

        return user
    }


    public async update(id: string, updateUserDto: UpdateUserDto)
    {
        const user = await this
            .userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec()

        if (!user)
        {
            throw new NotFoundException(`user with id ${id} not found`)
        }

        return user
    }


    public async remove(id: string)
    {
        const result = await this.userModel.findByIdAndDelete(id).exec()

        if (!result)
        {
            throw new NotFoundException(`user with id ${id} not found`)
        }

        return result
    }
}
