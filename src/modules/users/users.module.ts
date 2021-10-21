import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserImport } from '../../models';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([UserImport])],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
