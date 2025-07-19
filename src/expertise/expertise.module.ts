import { Module } from '@nestjs/common';
import { ExpertiseService } from './expertise.service';
import { ExpertiseController } from './expertise.controller';

@Module({
  providers: [ExpertiseService],
  controllers: [ExpertiseController]
})
export class ExpertiseModule {}
