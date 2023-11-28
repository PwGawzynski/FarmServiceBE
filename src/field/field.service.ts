import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { Field } from './entities/field.entity';
import { FieldAddress } from '../field-address/entities/field-address.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import { FieldResponseDto } from './dto/response/field.response';
import { Company } from '../company/entities/company.entity';
import { FieldAddressResponseDto } from '../field-address/dto/response/field-address.response.dto';

@Injectable()
export class FieldService {
  async createByOwner(createFieldDto: CreateFieldDto) {
    const filedAddress = new FieldAddress({ ...createFieldDto.address });
    const newField = new Field({
      ...createFieldDto,
      order: Promise.resolve(createFieldDto.order),
      address: Promise.resolve(filedAddress),
    });

    await filedAddress.save();
    newField.address = Promise.resolve(filedAddress);
    await newField.save();
    filedAddress.field = Promise.resolve(newField);
    filedAddress.save();

    // to prevent maximum call stack (circular dep. field.fieldAddress <-> fieldAddress.field )
    newField.address = undefined;
    return {
      code: ResponseCode.ProcessedWithoutConfirmationWaiting,
      payload: new FieldResponseDto({
        ...newField,
        address: new FieldAddressResponseDto(filedAddress),
      }),
    } as ResponseObject<FieldResponseDto>;
  }

  async getOne(PLid: string) {
    const field = await Field.findOne({
      where: { polishSystemId: PLid },
    });
    if (!field) throw new NotFoundException('Cannot find field with given id');
    return {
      code: ResponseCode.ProcessedCorrect,
      payload: new FieldResponseDto({
        ...field,
        address: new FieldAddressResponseDto(await field.address),
      }),
    } as ResponseObject<FieldResponseDto>;
  }

  async getAllFields(company: Company, orderId: string) {
    console.log(orderId, 'REST');
    const order = (await company.orders).find((o) => o.id === orderId);
    if (!order) {
      throw new ConflictException('Given order does not exist in your company');
    }
    return {
      code: ResponseCode.ProcessedCorrect,
      payload: await Promise.all(
        (
          await order.fields
        ).map(
          async (f) =>
            new FieldResponseDto({
              ...f,
              address: new FieldAddressResponseDto(await f.address),
            }),
        ),
      ),
    } as ResponseObject<FieldResponseDto[]>;
  }
}
