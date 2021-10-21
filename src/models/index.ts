import { User, UserSchema } from './user';
import { Address, AddressSchema } from './address';
import { Country, CountrySchema } from './country';
import { City, CitySchema } from './city';
import { State, StateSchema } from './state';
import { Company, CompanySchema } from './company';
import { CompanyPartner, CompanyPartnerSchema } from './company-partner';
import { AppDocumentFile, AppDocumentFileSchema } from './app-document-file';

export const allModels = [
  { name: User.name, schema: UserSchema },
  { name: Address.name, schema: AddressSchema },
  { name: Country.name, schema: CountrySchema },
  { name: City.name, schema: CitySchema },
  { name: State.name, schema: StateSchema },
  { name: Company.name, schema: CompanySchema },
  { name: CompanyPartner.name, schema: CompanyPartnerSchema },
  { name: AppDocumentFile.name, schema: AppDocumentFileSchema },
];

export const UserImport = { name: User.name, schema: UserSchema };
