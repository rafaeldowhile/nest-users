import { Module } from '@nestjs/common';
import { CompanyPartnerService } from './company-partner.service';
import { CompanyPartnerController } from './company-partner.controller';
import { CompanyModule } from '../company/company.module';
import { MongooseModule } from '@nestjs/mongoose';
import { allModels } from '../../models';

@Module({
  imports: [CompanyModule, MongooseModule.forFeature(allModels)],
  providers: [CompanyPartnerService],
  controllers: [CompanyPartnerController],
})
export class CompanyPartnerModule {}
