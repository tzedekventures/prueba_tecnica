import { Processor, WorkerHost } from '@nestjs/bullmq'
import { InjectConnection } from '@nestjs/mongoose'
import { Job } from 'bullmq'
import { Connection } from 'mongoose'
import { User } from 'src/users/schema/user.schema'
import { DeletionRequest } from './schema/deletion-request.schema'


@Processor('deletionQueue')
export class DeletionRequestProcessor extends WorkerHost
{
    constructor(@InjectConnection() private readonly connection: Connection) 
    {
        super()
    }


    public async process(job: Job<any>): Promise<any>
    {
        console.log('Processing deletion request')

        const { userId } = job.data
        const usuario: User = await this.connection.model(User.name).findById(userId)
        const deletionRequests = await this.connection.model(DeletionRequest.name).find({ userId })

        console.log(usuario)
        console.log(deletionRequests)

        if (!usuario)
            return

        if (deletionRequests.length < 1)
            return

        await this.connection.model(DeletionRequest.name).deleteOne({ userId }).exec()
        await this.connection.model(User.name).deleteOne({ _id: userId }).exec()
    }
}