/**
 * Mobile devices screen data object contains information about  user's email and password
 */
export interface EmailAndPasswordData {
  email: string;
  password: string;
}

/**
 * Mobile devices screen data object contains information user's name and surname
 */
export interface NameAndSurnameData {
  name: string;
  surname: string;
}
/**
 * Mobile devices screen data object contains information about company name and nip
 */
export interface CompanyNameAndNIPData {
  companyName: string;
  nip: string;
}
/**
 * Mobile devices screen data object contains information about  user's contact phone and company's contact phone
 */
export interface ContactPhonesData {
  contactPhone: string;
  companyCompactPhone: string;
}

/**
 * Mobile devices screen data object contains information about user's city, postal code, house number, circumference
 */
export interface CompanyAddressData {
  city: string;
  postalCode: string;
  houseNumber: string;
  circumference: string;
}

/**
 * Connected together register information interface
 */
export type RegisterDataObject = EmailAndPasswordData &
  NameAndSurnameData &
  CompanyNameAndNIPData &
  ContactPhonesData &
  CompanyAddressData;
export type RegisterDataMobi = RegisterDataObject;
