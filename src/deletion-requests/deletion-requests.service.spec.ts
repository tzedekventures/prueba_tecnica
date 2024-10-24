import { Test, TestingModule } from '@nestjs/testing'
import { DeletionRequestsService } from './deletion-requests.service'


describe('DeletionRequestsService', () =>
{
    let service: DeletionRequestsService

    beforeEach(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DeletionRequestsService],
        }).compile()

        service = module.get<DeletionRequestsService>(DeletionRequestsService)
    })

    it('should be defined', () =>
    {
        expect(service).toBeDefined()
    })
})
