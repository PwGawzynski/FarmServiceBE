import { Controller } from '@nestjs/common';
import { FieldAddressService } from './field-address.service';

@Controller('field-address')
export class FieldAddressController {
  constructor(private readonly fieldAddressService: FieldAddressService) {}
}
