import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../models/user';
import { City } from '../../models/city';
import { Country } from '../../models/country';
import { Address } from '../../models/address';
import { CompanyDto } from './dto/company.dto';
import { Company } from '../../models/company';
import { AuthUser } from '../../common/auth/auth-user';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(City.name) private cityModel: Model<City>,
    @InjectModel(Country.name) private countryModel: Model<Country>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {
  }

  async create(user: any, companyDto: CompanyDto): Promise<any> {
    const realUser: User = await this.userModel.findOne(
      { email: user.email },
      {},
    );
    if (!realUser) throw new NotFoundException('User not found');

    const existingCompany = await this.companyModel.findById(realUser.company);

    if (existingCompany) {
      throw new BadRequestException(
        'The user already have a company registered.',
      );
    }

    const country = await this.countryModel
      .findById(companyDto.countryId)
      .exec();

    let newCompany = new this.companyModel(companyDto);
    newCompany.country = country;
    newCompany = await newCompany.save();

    realUser.company = newCompany;
    await realUser.save();

    return newCompany;
  }

  async getByEmail(email: string): Promise<any> {
    const realUser: User = await this.userModel.findOne(
      { email: email },
      {},
      { populate: ['address'] },
    );

    if (!realUser) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      });
    }

    return realUser;
  }

  async update(user: AuthUser, companyDto: Partial<CompanyDto>): Promise<any> {
    const realCompany = await this.companyModel.findById(user.companyId);
    if (!realCompany) throw new NotFoundException('Company not found');

    Object.assign(realCompany, companyDto);

    return await realCompany.save();
  }

  async findOne(params: any, projection?, options?): Promise<Company> {
    const company = await this.companyModel.findOne(
      params,
      projection,
      options,
    );

    if (!company) throw new NotFoundException('Company not found!');

    return company;
  }
}
