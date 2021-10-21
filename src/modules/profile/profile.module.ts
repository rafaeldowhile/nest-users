import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { allModels } from '../../models';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [MongooseModule.forFeature(allModels)],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
