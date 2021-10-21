export class CompanyDto implements Readonly<CompanyDto> {
  companyName: string;
  tradingName: string;
  ein: string;
  ftin: string;
  fieldOfActivity: string;
  email: string;
  phone: string;
  isForeignCompany: boolean;
  countryId: string;
}
