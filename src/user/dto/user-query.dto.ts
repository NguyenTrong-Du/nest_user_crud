import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UserQueries {
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isSoftDelete: boolean;
}
