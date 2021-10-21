import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { allModels } from '../../models';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

@Module({
  imports: [MongooseModule.forFeature(allModels)],
  exports: [CompanyService],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {
}
