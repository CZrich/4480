import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MentorsModule } from './mentors/mentors.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

import {ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    
      ConfigModule.forRoot({
      isGlobal: true, // Esto es crucial para que esté disponible en toda la app
    }),
    AuthModule, UsersModule, MentorsModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
