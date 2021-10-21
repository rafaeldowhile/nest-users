import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileDocumentDto } from './dtos/profile-document.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/user';
import { Model } from 'mongoose';
import { FileService } from '../../common/services/file-service';
import { AppDocumentFile } from '../../models/app-document-file';
import { AuthUser } from '../../common/auth/auth-user';

@Injectable()
export class ProfileDocumentsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(AppDocumentFile.name)
    private readonly appDocumentFileModel: Model<AppDocumentFile>,
    private readonly fileService: FileService,
  ) {
  }

  async create(
    user: AuthUser,
    file: Express.Multer.File,
    profileDocumentDto: ProfileDocumentDto,
  ): Promise<any> {
    const realUser = await this.userModel.findById(user._id);
    if (!realUser) throw new NotFoundException('Invalid user');

    const uploadedFile = await this.fileService.uploadS3(
      file.buffer,
      file.originalname,
      `documents/${user._id}/`,
    );

    const appDocumentFile = new this.appDocumentFileModel();

    appDocumentFile.documentType = profileDocumentDto.documentType;
    appDocumentFile.filename = uploadedFile.filename;
    appDocumentFile.aws = {
      key: uploadedFile.key,
      url: uploadedFile.url,
    };
    await appDocumentFile.save();

    realUser.documents.push(appDocumentFile._id);

    await realUser.save();

    return appDocumentFile;
  }
}
