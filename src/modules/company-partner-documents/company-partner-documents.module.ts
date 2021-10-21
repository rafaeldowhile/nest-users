import { Module } from '@nestjs/common';
import { CompanyPartnerDocumentsService } from './company-partner-documents.service';
import { CompanyPartnerDocumentsController } from './company-partner-documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { allModels } from '../../models';
import { FileService } from '../../common/services/file-service';

@Module({
  imports: [MongooseModule.forFeature(allModels)],
  providers: [CompanyPartnerDocumentsService, FileService],
  controllers: [CompanyPartnerDocumentsController],
})
export class CompanyPartnerDocumentsModule {}
