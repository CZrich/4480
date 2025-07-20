import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateRewardDto {
  @IsInt()
  @Min(1)
  points: number;

  @IsOptional()
  @IsString()
  badge?: string;
}
