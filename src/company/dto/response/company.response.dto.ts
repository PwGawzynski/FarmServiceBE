import { Exclude, Expose } from 'class-transformer';
import { OmitBaseEntityAndId } from '../../../../SelfTypes/OmitBaseEntity';
import { Company } from '../../entities/company.entity';

export class CompanyResponseWhiteList {
  constructor(partial: Partial<CompanyResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  name: string;

  @Expose()
  addressId: string;
}

@Exclude()
export class CompanyResponseDto
  extends CompanyResponseWhiteList
  implements
    OmitBaseEntityAndId<Company, 'address' | 'owner' | '_shouldNotExist'>
{
  constructor(partial: Partial<CompanyResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
