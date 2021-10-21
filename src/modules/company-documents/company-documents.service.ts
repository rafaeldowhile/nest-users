import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyDocumentDto } from './dtos/company-document.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService } from '../../common/services/file-service';
import { AppDocumentFile } from '../../models/app-document-file';
import { Company } from '../../models/company';

@Injectable()
export class CompanyDocumentsService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    @InjectModel(AppDocumentFile.name)
    private readonly appDocumentFileModel: Model<AppDocumentFile>,
    private readonly fileService: FileService,
  ) {}

  async create(
    user,
    file: Express.Multer.File,
    profileDocumentDto: CompanyDocumentDto,
  ): Promise<any> {
    const company = await this.companyModel.findById(user.companyId);
    if (!company) throw new NotFoundException('Invalid company');

    const uploadedFile = await this.fileService.uploadS3(
      file.buffer,
      file.originalname,
      `documents/${user._id}/company/${company._id}/documents`,
    );

    const appDocumentFile = new this.appDocumentFileModel();

    appDocumentFile.documentType = profileDocumentDto.documentType;
    appDocumentFile.filename = uploadedFile.filename;
    appDocumentFile.aws = {
      key: uploadedFile.key,
      url: uploadedFile.url,
    };
    await appDocumentFile.save();

    company.documents.push(appDocumentFile._id);
    await company.save();

    return appDocumentFile;
  }
}
