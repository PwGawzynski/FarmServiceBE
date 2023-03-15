import {Theme} from "../entities/account.entity";
import {IsEnum} from "class-validator";

export class CreateAccountDto{
    @IsEnum(Theme)
    theme: Theme;
}
