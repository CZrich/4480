import { IsUUID, IsString, IsDateString } from 'class-validator';

export class CreateSessionDto {
  @IsUUID()
  mentorId: string;
  @IsUUID()
  menteeId: string;

  @IsDateString()
  date: string;

  @IsString()
  topic: string;
}
