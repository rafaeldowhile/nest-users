import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../models/user';
import * as moment from 'moment';
import { Address } from '../../models/address';
import { Country } from '../../models/country';
import { SignupDto } from './dto/signup.dto';
import { AppDocumentType } from '../../common/enums/app-document-type';
import { AppUserStatus } from '../../common/enums/app-user-status';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
    @InjectModel(Country.name) private countryModel: Model<Country>,
  ) {}

  /**
   * Create new user to use the application
   *
   * @param signupDto
   */
  async signup(signupDto: SignupDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: signupDto.email })
      .exec();

    console.log(signupDto);

    if (existingUser) {
      throw new NotFoundException('This email is already registered!');
    }

    const realCountry = await this.countryModel
      .findById(signupDto.countryId)
      .exec();

    if (!realCountry) {
      throw new NotFoundException('Country not found');
    }

    const newUser = new this.userModel(signupDto);

    newUser.country = realCountry._id;
    newUser.status = AppUserStatus.ACTIVE;
    newUser.password = Bcrypt.hashSync(newUser.password, 10);

    await newUser.save();

    return newUser;
  }

  async test(): Promise<string> {
    const newAddress = new this.addressModel({
      street: 'Rua Visconde do Herval',
      number: '437',
      district: 'Menino Deus',
      postalCode: '90130151',
    });

    const country = await this.countryModel.findOne({ code: 'BR' });

    const newUser = new this.userModel({
      name: 'Rafael',
      lastName: 'Fonseca',
      dateOfBirth: moment('09/06/1992', 'DD/MM/YYYY'),
      identityDocument: {
        documentType: AppDocumentType.CPF,
        documentValue: '02917618019',
      },
      email: 'rafael@dowhile.com.br',
      phone: '51985047452',
      password: '123456',
      status: AppUserStatus.ACTIVE,
      address: await newAddress.save(),
      country: country,
    });

    newUser.save();

    return 'Hello World!';
  }
}
