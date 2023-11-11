import { IsEnum } from 'class-validator';
import { Theme } from '../../../FarmServiceTypes/Account/Constants';

/**
 * This DTO contains information about account entity properties types
 */
export class CreateAccountDto {
  @IsEnum(Theme)
  theme: Theme;
}
