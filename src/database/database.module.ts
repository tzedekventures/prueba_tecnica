import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'


@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) =>
            {
                const username: string = configService.getOrThrow<string>('MONGO_INITDB_ROOT_USERNAME')
                const password: string = configService.getOrThrow<string>('MONGO_INITDB_ROOT_PASSWORD')
                const host: string = configService.getOrThrow<string>('MONGO_HOST')
                const port: string = configService.getOrThrow<string>('MONGO_PORT')
                const database: string = configService.getOrThrow<string>('MONGO_INITDB_DATABASE')

                const uri: string = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`

                return { uri }
            },
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule { }
