import { IdentityDocumentDto } from './identity-document.dto';
import { IsEmail } from 'class-validator';

export class CompanyPartnerDto implements Readonly<CompanyPartnerDto> {
  name: string;
  lastName: string;
  jobTitle: string;
  dateOfBirth: Date;
  identityDocument: IdentityDocumentDto;
  email: string;
  phone: string;
}
