import { Exclude, Expose } from 'class-transformer';

export class FieldResponseWhiteList {
  constructor(partial: Partial<FieldResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  polishSystemId: string;

  @Expose()
  area: number;

  @Expose()
  dateOfCollectionData: Date;

  @Expose()
  addressId: string;
}

@Exclude()
export class FieldResponseDto extends FieldResponseWhiteList {
  constructor(partial: Partial<FieldResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
