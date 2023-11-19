import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { CreateFieldDto } from './dto/create-field.dto';
import { Field } from './entities/field.entity';
import { FieldAddress } from '../field-address/entities/field-address.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import { FieldResponseDto } from './dto/response/field.response';

@Injectable()
export class FieldService {
  async createByOwner(createFieldDto: CreateFieldDto, user: User) {
    const filedAddress = new FieldAddress({ ...createFieldDto.address });
    const newField = new Field({
      ...createFieldDto,
      owner: Promise.resolve(user),
      address: Promise.resolve(filedAddress),
    });

    await filedAddress.save();
    newField.address = Promise.resolve(filedAddress);
    await newField.save();
    filedAddress.field = Promise.resolve(newField);
    filedAddress.save();

    // TODO change to return field.response.dto
    return {
      code: ResponseCode.ProcessedWithoutConfirmationWaiting,
      payload: {
        ...newField,
        owner_id: user.id,
        addressId: filedAddress.id,
      },
    } as ResponseObject<FieldResponseDto>;
  }

  async getAllFields(user: User) {
    const fields = await user.fields;
    return Promise.all(
      fields.map(
        async (field) =>
          new FieldResponseDto({
            ...field,
            owner_id: user.id,
            addressId: (await field.address).id,
          }),
      ),
    );
  }
}
