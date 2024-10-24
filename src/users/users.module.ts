import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User, UserSchema } from './schema/user.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { DeletionRequestsModule } from 'src/deletion-requests/deletion-requests.module'


@Module({
    imports: [
        AuthModule,
        DeletionRequestsModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
