import { Processor, WorkerHost } from '@nestjs/bullmq'
import { InjectConnection } from '@nestjs/mongoose'
import { Job } from 'bullmq'
import { Connection } from 'mongoose'


@Processor('deletionQueue')
export class DeletionRequestProcessor extends WorkerHost
{
    constructor(@InjectConnection() private readonly connection: Connection) 
    {
        super()
    }


    public async process(job: Job<any>): Promise<any>
    {
        const { userId } = job.data
        // await this.userService.deleteUserById(userId)
        // Actualizar estado o realizar acciones adicionales si es necesario.
    }
}