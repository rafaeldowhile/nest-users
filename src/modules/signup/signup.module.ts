import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { MongooseModule } from '@nestjs/mongoose';
import { allModels } from '../../models';

@Module({
  imports: [MongooseModule.forFeature(allModels)],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
