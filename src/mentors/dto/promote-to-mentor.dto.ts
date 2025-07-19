// src/mentor/dto/promote-to-mentor.dto.ts

//import { IsArray, IsOptional, IsString } from 'class-validator';

export class PromoteToMentorDto {
  //@IsString()
  bio: string;

  //@IsArray()
  //@IsString({ each: true })
  //@IsOptional()
  expertise?: string[];
}
