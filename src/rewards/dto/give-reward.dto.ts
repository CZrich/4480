import { IsInt, Min, Max, IsString, IsOptional } from 'class-validator';

export class GiveRewardDto {
  @IsString()
  sessionId: string;

  @IsInt()
  @Min(1)
  @Max(5) // Puntos de 1 a 5 por ejemplo
  points: number;

  @IsOptional()
  @IsString()
  badge?: string;
}
