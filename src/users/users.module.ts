import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User, UserSchema } from './schema/user.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'


@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
