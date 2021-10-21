import { IdentityDocumentDto } from './identity-document.dto';
import { AddressDto } from './address.dto';

export class GeneralProfileDto {
  readonly name: string;
  readonly lastname: string;
  readonly dateOfBirth: Date;
  readonly identityDocument: IdentityDocumentDto;
  readonly address: AddressDto;
  readonly countryId: string;
}
