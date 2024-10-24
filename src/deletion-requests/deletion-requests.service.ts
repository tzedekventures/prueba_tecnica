import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DeletionRequest, DeletionRequestDocument } from './schema/deletion-request.schema'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'


@Injectable()
export class DeletionRequestsService 
{
    constructor(
        @InjectModel(DeletionRequest.name)
        private deletionRequestModel: Model<DeletionRequestDocument>,
        @InjectQueue('deletionQueue')
        private deletionQueue: Queue,
    ) { }


    public async findByUserId(userId: string): Promise<DeletionRequest>
    {
        return this.deletionRequestModel.findOne({ userId }).exec()
    }


    public async requestDeletion(userId: string): Promise<void>
    {
        const existingRequest = await this.findByUserId(userId)

        if (existingRequest && !existingRequest.processed)
        {
            throw new BadRequestException('Ya existe una solicitud de eliminación para este usuario')
        }

        const newRequest = new this.deletionRequestModel({ userId, processed: false })
        await newRequest.save()

        await this.deletionQueue.add('deleteUser', { userId })
    }
}
