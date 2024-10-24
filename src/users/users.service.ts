import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument, UserRole } from './schema/user.schema'
import { Res } from 'src/common/lib/res'
import { ListDto } from 'src/common/dto/list.dto'
import { DeletionRequestsService } from 'src/deletion-requests/deletion-requests.service'


@Injectable()
export class UsersService
{
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly deletionRequestsService: DeletionRequestsService,
    ) { }


    public async create(createUserDto: CreateUserDto)
    {
        const userExists = await this.userModel.findOne({
            email: createUserDto.email
        })

        if (userExists)
            throw new BadRequestException('User already exists')

        const user = new this.userModel({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        })

        await user.save()

        return { ...createUserDto, password: null, _id: user._id }
    }


    public async findAll(listDto: ListDto)
    {
        const { page, limit } = listDto

        const data = await this.userModel
            .find()
            .select('-password')
            .skip((page - 1) * limit)
            .limit(limit)
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


    public async update(id: string, updateUserDto: UpdateUserDto, user: User)
    {

        const usuario = await this
            .userModel
            .findById(id)
            .exec()

        if (!usuario)
        {
            throw new NotFoundException(`usuario with id ${id} not found`)
        }

        if (usuario.role === UserRole.ADMIN && user._id != usuario._id.toString())
            throw new BadRequestException('No puedes actualizar un administrador que no seas tu mismo')

        if (user._id != usuario._id && user.role === UserRole.USER)
            throw new BadRequestException('No puedes actualizar un usuario que no seas tu mismo')

        if (updateUserDto.password)
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)

        if (updateUserDto.email)
        {
            const userExists = await this.userModel.findOne({
                email: updateUserDto.email
            })

            if (userExists)
                throw new BadRequestException('Email ya registrado, elija otro')
        }

        Object.assign(usuario, updateUserDto)

        usuario.save()

        return {
            ...usuario.toObject(),
            password: null
        }
    }


    public async remove(id: string, user: User)
    {
        const result = await this.userModel.findById(id).exec()

        if (!result)
        {
            throw new NotFoundException(`user with id ${id} not found`)
        }

        if (result.role === UserRole.ADMIN && user._id != result._id.toString())
            throw new BadRequestException('No puedes eliminar un administrador que no seas tu mismo')

        if (user._id != result._id.toString() && user.role === UserRole.USER)
            throw new BadRequestException('No puedes eliminar un usuario que no seas tu mismo')

        if (user.role === UserRole.USER)
        {
            const existingRequest = await this.deletionRequestsService.findByUserId(id)

            if (existingRequest && !existingRequest.processed)
            {
                throw new BadRequestException('Ya existe una solicitud de eliminación para este usuario')
            }

            await this.deletionRequestsService.requestDeletion(id)

            return { message: 'Solicitud de eliminación creada exitosamente' }
        }
        // nota: si el usuario es administrador simplemente lo voy a eliminar en este ejemplo, y su sesion se cerrara
        else if (user.role === UserRole.ADMIN)
        {
            const deleteResult = await this.userModel.deleteOne({ _id: id }).exec()

            return deleteResult
        }
    }
}
