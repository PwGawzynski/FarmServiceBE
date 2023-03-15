import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/entities/user.entity";

@Entity()
export class Address extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({
        nullable: false,
        length: 70,
    })
    city: string;

    @Column({
        length:50,
        nullable:false,
    })
    county: string;

    @Column({
        length:50,
        nullable:true,
    })
    voivodeship: string;

    @Column({
        length:6,
        nullable:false,
    })
    postalCode: string;

    @Column({
        length:100,
        nullable: true,
    })
    street: string;

    @Column({
        length:20,
        nullable:false,
    })
    houseNumber: string;

    @Column({
        length:20,
        nullable:true,
    })
    apartmentNumber: string;


    @OneToOne(()=>User, (user)=>user.address)
    user: Promise<User>
}
