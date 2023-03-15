import {IsNotEmpty, IsOptional, IsString, Length, Matches} from "class-validator";

/**
 * This DTO represent all address entities in application
 */
export class CreateAddressDto{
    @IsString({
        message: "City must be string type"
    })
    @IsNotEmpty({
        message: 'City cannot be empty string'
    })
    @Length(0,70)
    city: string;

    @IsString({
        message: "County must be string type"
    })
    @IsNotEmpty({
        message: 'County cannot be empty string'
    })
    @Length(0,50)
    county:string;

    @IsString({
        message: "Voivodeship must be string type"
    })
    @IsNotEmpty({
        message: 'Voivodeship cannot be empty string'
    })
    @Length(0,50)
    @IsOptional()
    voivodeship?: string;



    @IsString({
        message: "Street must be string type"
    })
    @IsNotEmpty({
        message: 'Street cannot be empty string'
    })
    @Length(0,100)
    @IsOptional()
    street?:string;


    @IsString({
        message: "House number must be string type"
    })
    @IsNotEmpty({
        message: 'House number cannot be empty string'
    })
    @Length(0,20)
    houseNumber:string;

    @IsString({
        message: "Apartment number must be string type"
    })
    @IsNotEmpty({
        message: 'Apartment number cannot be empty string'
    })
    @Length(0,20)
    @IsOptional()
    apartmentNumber?:string

    @IsString({
        message: "Postal code must be string type"
    })
    @IsNotEmpty({
        message: 'Postal code cannot be empty string'
    })
    @Matches("^[0-9]{2}-[0-9]{3}$")
    @Length(0,6)
    postalCode: string;

}
