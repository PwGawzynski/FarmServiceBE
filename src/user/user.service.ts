import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {Request} from "express";
import {User} from "./entities/user.entity";
import {Account} from "./entities/account.entity";
import {UserPersonalData} from "./entities/userPersonalData.entity";
import {Address} from "../commonEntities/address.entity";
import {ResponseCode, ResponseObject} from "../../types/respnse/responseGeneric";
import {MailingService} from "../mailing/mailing.service";
import {v4 as uuid} from 'uuid';

@Injectable()
export class UserService {
    constructor(private readonly mailer : MailingService) {
    }
    /**
     * Method which extracts information about userID from req object
     * @param req - req object from express
     * @throws HttpException when userId property is inaccessible
     */
    _getUserIdFromReq(req: Request): string {
        const userId = req.user['userId'];
        if (!userId)
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        return userId;
    }

    /**
     * Method which validate if given user already exist
     * @param createUserData
     * @throws HttpException when user already exist
     */
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

    /**
     * Method which creates new user witch its connected entities like account, address and so on, and save this entities in db
     * @param createUserDto - DTO object contains data specified by DTO
     * @param req -req object from express
     */
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
        newAccount.activationCode = uuid();

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



        this.mailer.sendMail({
            to: newUser.email,
            template:'activateNewAccount',
            subject:`Welcome on board, let's activate your account`,
            context:{
                username: `${newUserPersonalData.name} ${newUserPersonalData.surname}`,
                activateLink: `http://localhost:3002/user/activate/${newAccount.activationCode}`,
            }
        })

        await newUser.save();
        newAddress.save();
        newAccount.save();
        newUserPersonalData.save();



        return {
            code: ResponseCode.ProcessedWithoutConfirmationWaiting
        } as ResponseObject;

    }

    async activate(activationCode) {
        const user = await User.findOne({
            where:{
                account:{
                    activationCode,
                }
            }
        })
        if(!user) throw new HttpException("Incorrect activation code", HttpStatus.BAD_REQUEST);
        const userAccount = (await user.account);
        userAccount.isActivated = true;
        userAccount.save();
        return {
            code: ResponseCode.ProcessedWithoutConfirmationWaiting,
        } as ResponseObject;
    }
}
