import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/user';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  async findUser(params: any, projection?: any, options?: any): Promise<User> {
    return this.userModel.findOne(params, projection, options);
  }
}
