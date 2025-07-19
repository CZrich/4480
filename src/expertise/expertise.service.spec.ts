import { Test, TestingModule } from '@nestjs/testing';
import { ExpertiseService } from './expertise.service';

describe('ExpertiseService', () => {
  let service: ExpertiseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpertiseService],
    }).compile();

    service = module.get<ExpertiseService>(ExpertiseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
