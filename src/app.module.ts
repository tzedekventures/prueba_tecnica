import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { DeletionRequestsModule } from './deletion-requests/deletion-requests.module'


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        DatabaseModule,
        UsersModule,
        DeletionRequestsModule,
    ],
})
export class AppModule { }
