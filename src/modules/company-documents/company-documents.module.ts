import { Module } from '@nestjs/common';
import { CompanyDocumentsService } from './company-documents.service';
import { CompanyDocumentsController } from './company-documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { allModels } from '../../models';
import { FileService } from '../../common/services/file-service';

@Module({
  imports: [MongooseModule.forFeature(allModels)],
  providers: [CompanyDocumentsService, FileService],
  controllers: [CompanyDocumentsController],
})
export class CompanyDocumentsModule {}
