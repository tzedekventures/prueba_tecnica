import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DeletionRequest, DeletionRequestSchema } from './schema/deletion-request.schema'
import { BullModule } from '@nestjs/bullmq'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DeletionRequestsService } from './deletion-requests.service'
import { DeletionRequestProcessor } from './deletion-request.processor'


@Module({
    imports: [
        MongooseModule.forFeature([{ name: DeletionRequest.name, schema: DeletionRequestSchema }]),
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                connection: {
                    host: configService.getOrThrow<string>('REDIS_HOST') || 'localhost',
                    port: parseInt(configService.getOrThrow<string>('REDIS_PORT'), 10) || 6379,
                    password: configService.getOrThrow<string>('REDIS_PASSWORD'),
                },
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue({
            name: 'deletionQueue',
        }),
    ],
    providers: [
        DeletionRequestsService,
        DeletionRequestProcessor,
    ],
    exports: [DeletionRequestsService],
})
export class DeletionRequestsModule { }
