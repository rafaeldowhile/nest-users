import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyPartnerDocumentDto } from './dtos/company-partner-document.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService } from '../../common/services/file-service';
import { AppDocumentFile } from '../../models/app-document-file';
import { Company } from '../../models/company';
import { CompanyPartner } from '../../models/company-partner';

@Injectable()
export class CompanyPartnerDocumentsService {
  constructor(
    @InjectModel(CompanyPartner.name)
    private readonly companyPartnerModel: Model<CompanyPartner>,
    @InjectModel(AppDocumentFile.name)
    private readonly appDocumentFileModel: Model<AppDocumentFile>,
    private readonly fileService: FileService,
  ) {
  }

  async create(
    user,
    partnerId,
    file: Express.Multer.File,
    profileDocumentDto: CompanyPartnerDocumentDto,
  ): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const partner = await this.companyPartnerModel.findOne({
      _id: partnerId,
      company: user.companyId,
    });

    if (!partner) throw new NotFoundException('Invalid company partner');

    const uploadedFile = await this.fileService.uploadS3(
      file.buffer,
      file.originalname,
      `documents/${user._id}/partner/${partnerId}/documents`,
    );

    const appDocumentFile = new this.appDocumentFileModel();

    appDocumentFile.documentType = profileDocumentDto.documentType;
    appDocumentFile.filename = uploadedFile.filename;
    appDocumentFile.aws = {
      key: uploadedFile.key,
      url: uploadedFile.url,
    };
    await appDocumentFile.save();

    partner.documents.push(appDocumentFile._id);
    await partner.save();

    return appDocumentFile;
  }
}
