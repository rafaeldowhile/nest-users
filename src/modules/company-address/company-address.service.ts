import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyAddressDto } from './dtos/company-address.dto';
import { Company } from '../../models/company';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from '../../models/address';
import { City } from '../../models/city';

@Injectable()
export class CompanyAddressService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
    @InjectModel(City.name) private readonly cityModel: Model<City>,
  ) {}

  async create(
    userCompanyid: string,
    companyId: string,
    companyAddressDto: CompanyAddressDto,
  ): Promise<any> {
    if (companyId !== userCompanyid) {
      throw new BadRequestException('Invalid company');
    }

    const realCompany = await this.companyModel.findById(userCompanyid);
    if (!realCompany) throw new NotFoundException('Company not found!');
    if (realCompany.address)
      throw new BadRequestException('Company already have an address');

    const newAddress = new this.addressModel(companyAddressDto);
    const city = await this.cityModel.findById(companyAddressDto.cityId);
    newAddress.city = city;

    await newAddress.save();
    realCompany.address = newAddress;
    await realCompany.save();

    return newAddress;
  }

  async update(
    userCompanyId: string,
    companyId: string,
    companyAddressDto: Partial<CompanyAddressDto>,
  ): Promise<any> {
    if (companyId !== userCompanyId) {
      throw new BadRequestException('Invalid company');
    }

    const realCompany = await this.companyModel.findById(userCompanyId);
    if (!realCompany) throw new NotFoundException('Company not found!');
    console.log(realCompany);
    const currentAddress = await this.addressModel.findById(
      realCompany.address,
    );

    console.log(currentAddress);

    Object.assign(currentAddress, companyAddressDto);

    if (companyAddressDto.cityId) {
      const city = await this.cityModel.findById(companyAddressDto.cityId);
      currentAddress.city = city;
    }

    return await currentAddress.save();
  }

  async findOne(userCompanyId: string, companyId: string): Promise<any> {
    if (userCompanyId !== companyId)
      throw new BadRequestException('Invalid company');

    const realCompany = await this.companyModel.findById(
      userCompanyId,
      {},
      { populate: ['address'] },
    );

    if (!realCompany) throw new NotFoundException('Company not found');

    return realCompany.address;
  }
}
