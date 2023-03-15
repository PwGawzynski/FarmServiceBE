import {IsDefined, IsEmail, IsNotEmpty, IsNotEmptyObject, IsString, Length, ValidateNested} from "class-validator";
import {CreateUserPersonalDataDto} from "./create-userPersonalData.dto";
import {CreateAddressDto} from "../../commonEntities/commonEntitiesDTOs/create-address.dto";
import {CreateAccountDto} from "./create-account.dto";
import {Type} from "class-transformer";

export class CreateUserDto {
    @IsString({
        message: "User login/email/nip must be string type"
    })
    @IsNotEmpty({
        message: 'User login/email/nip cannot be empty string'
    })
    @Length(0,40)
    userLoginIdentificator:string;


    @IsString({
        message: "User email must be string type"
    })
    @IsNotEmpty({
        message: 'User email cannot be empty string'
    })
    @Length(0,350)
    @IsEmail()
    email: string;

    @IsNotEmptyObject()
    @IsDefined()
    @Type(()=>CreateUserPersonalDataDto)
    @ValidateNested()
    userPersonalData: CreateUserPersonalDataDto;

    @IsNotEmptyObject()
    @IsDefined()
    @Type(()=>CreateAddressDto)
    @ValidateNested()
    addressData: CreateAddressDto;

    @IsNotEmptyObject()
    @IsDefined()
    @Type(()=>CreateAccountDto)
    @ValidateNested()
    accountData: CreateAccountDto;
}
