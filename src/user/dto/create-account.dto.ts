import { Theme } from '../entities/account.entity';
import { IsEnum } from 'class-validator';

/**
 * This DTO contains information about account entity properties types
 */
export class CreateAccountDto {
  @IsEnum(Theme)
  theme: Theme;
}
