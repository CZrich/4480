import { Test, TestingModule } from '@nestjs/testing';
import { ExpertiseController } from './expertise.controller';

describe('ExpertiseController', () => {
  let controller: ExpertiseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpertiseController],
    }).compile();

    controller = module.get<ExpertiseController>(ExpertiseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
