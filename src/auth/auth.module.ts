import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
//import { JwtService } from '@nestjs/jwt';
//import { UsersService } from 'src/users/users.service';
import { ConfigModule,ConfigService} from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { MenteesModule } from 'src/mentees/mentees.module';
import { MenteesService } from 'src/mentees/mentees.service';
import { MentorsModule } from 'src/mentors/mentors.module';

@Module({


  imports: [
    ConfigModule,
    UsersModule,
    MenteesModule,
    //MentorsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
      
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService,JwtStrategy,UsersService,MenteesService],//,JwjtService, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
