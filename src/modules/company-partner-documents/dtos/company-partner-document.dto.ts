import { Transform } from 'class-transformer';
import { AppDocumentType } from '../../../common/enums/app-document-type';
import { AppDocumentDirection } from '../../../common/enums/app-document-direction';

export class CompanyPartnerDocumentDto {
  @Transform(({ value }) =>
    Object.entries(AppDocumentType).find(([key, val]) => val === value),
  )
  documentType: AppDocumentType;

  @Transform(({ value }) =>
    Object.entries(AppDocumentDirection).find(([key, val]) => val === value),
  )
  documentDirection: AppDocumentDirection;
}
