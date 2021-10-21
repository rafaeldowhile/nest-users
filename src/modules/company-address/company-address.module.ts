import { Module } from '@nestjs/common';
import { CompanyAddressService } from './company-address.service';
import { CompanyAddressController } from './company-address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { allModels } from '../../models';

@Module({
  imports: [MongooseModule.forFeature(allModels)],
  providers: [CompanyAddressService],
  controllers: [CompanyAddressController],
})
export class CompanyAddressModule {}
