import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {Request} from "express";
import {User} from "./entities/user.entity";
import {Account} from "./entities/account.entity";
import {UserPersonalData} from "./entities/userPersonalData.entity";
import {Address} from "../commonEntities/address.entity";
import {ResponseCode, ResponseObject} from "../../types/respnse/responseGeneric";

@Injectable()
export class UserService {
    _getUserIdFromReq(req: Request): string {
        const userId = req.user['userId'];
        if (!userId)
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        return userId;
    }

    async _validateUser(createUserData: CreateUserDto) {
        const result = await User.findOne({
            where: [
                {
                    email: createUserData.email,
                },
                {
                    userLoginIdentificator: createUserData.userLoginIdentificator,
                },
            ],
        });
        if (result)
            throw new HttpException(
                `User with ${
                    result.userLoginIdentificator === createUserData.userLoginIdentificator ? 'nickname' : 'email'
                } already exist`,
                HttpStatus.CONFLICT,
            );
    }
    async create(createUserDto: CreateUserDto, req: Request) {
        const userId =  this._getUserIdFromReq(req);

        await this._validateUser(createUserDto);

        const newUser = new User();
        const newAccount = new Account();
        const newUserPersonalData = new UserPersonalData();
        const newAddress = new Address();

        newUser.id  = userId;
        newUser.userLoginIdentificator = createUserDto.userLoginIdentificator;
        newUser.email = createUserDto.email;

        newAccount.theme = createUserDto.accountData.theme;

        newUserPersonalData.name = createUserDto.userPersonalData.name;
        newUserPersonalData.surname = createUserDto.userPersonalData.surname;
        newUserPersonalData.phoneNumber = createUserDto.userPersonalData.phoneNumber;

        newAddress.city = createUserDto.addressData.city;
        newAddress.county = createUserDto.addressData.county;
        newAddress.voivodeship = createUserDto.addressData.voivodeship;
        newAddress.street = createUserDto.addressData.street;
        newAddress.postalCode = createUserDto.addressData.postalCode;
        newAddress.apartmentNumber = createUserDto.addressData.apartmentNumber;
        newAddress.houseNumber = createUserDto.addressData.houseNumber;


        newAccount.user = Promise.resolve(newUser);
        newUserPersonalData.user = Promise.resolve(newUser);
        newAddress.user = Promise.resolve(newUser);
 
        await newUser.save();
        newAddress.save();
        newAccount.save();
        newUserPersonalData.save();

        return {
            code: ResponseCode.ProcessedWithoutConfirmationWaiting
        } as ResponseObject;

    }
}
