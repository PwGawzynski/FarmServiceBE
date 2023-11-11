import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateUserPersonalDataDto } from './create-userPersonalData.dto';
import { CreateAddressDto } from '../../commonEntities/dto/create-address.dto';
import { CreateAccountDto } from './create-account.dto';
import { Type } from 'class-transformer';
import {
  RegisterNewUserDataDtoInterfaceMobi,
  UserRole,
} from '../../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';

/**
 * This DTO contains information about User entity properties types
 */
export class CreateUserDto implements RegisterNewUserDataDtoInterfaceMobi {
  @IsString({
    message: 'User login/email/nip must be string type',
  })
  @IsNotEmpty({
    message: 'User login/email/nip cannot be empty string',
  })
  @Length(0, 40)
  @IsOptional()
  userLoginIdentificator?: string;

  @IsString({
    message: 'User email must be string type',
  })
  @IsNotEmpty({
    message: 'User email cannot be empty string',
  })
  @Length(0, 350)
  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  userRole: UserRole;

  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => CreateUserPersonalDataDto)
  @ValidateNested()
  userPersonalData: CreateUserPersonalDataDto;

  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => CreateAddressDto)
  @ValidateNested()
  addressData: CreateAddressDto;

  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => CreateAccountDto)
  @ValidateNested()
  accountData: CreateAccountDto;
}
