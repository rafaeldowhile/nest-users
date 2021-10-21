export class CompanyAddressDto implements Readonly<CompanyAddressDto> {
  street: string;
  number: string;
  district: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  cityId: string;
}
