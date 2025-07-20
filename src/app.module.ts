import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MentorsModule } from './mentors/mentors.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

import {ConfigModule } from '@nestjs/config';
import { MenteesModule } from './mentees/mentees.module';
import { ExpertiseModule } from './expertise/expertise.module';
import { SessionsModule } from './sessions/sessions.module';
import { RewardsModule } from './rewards/rewards.module';



@Module({
  imports: [
    
      ConfigModule.forRoot({
      isGlobal: true, // Esto es crucial para que esté disponible en toda la app
    }),
    AuthModule, UsersModule, MentorsModule, PrismaModule, MenteesModule, ExpertiseModule, SessionsModule, RewardsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
