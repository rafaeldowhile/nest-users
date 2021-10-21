import { Module } from '@nestjs/common';
import { ProfileDocumentsService } from './profile-documents.service';
import { ProfileDocumentsController } from './profile-documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { allModels } from '../../models';
import { FileService } from '../../common/services/file-service';

@Module({
  imports: [MongooseModule.forFeature(allModels)],
  providers: [ProfileDocumentsService, FileService],
  controllers: [ProfileDocumentsController],
})
export class ProfileDocumentsModule {
}
