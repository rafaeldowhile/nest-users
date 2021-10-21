import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyPartnerDto } from './dtos/company-partner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyPartner } from '../../models/company-partner';
import { Model } from 'mongoose';
import { AuthUser } from '../../common/auth/auth-user';
import { CompanyService } from '../company/company.service';

@Injectable()
export class CompanyPartnerService {
  constructor(
    private readonly companyService: CompanyService,
    @InjectModel(CompanyPartner.name)
    private readonly companyPartnerModel: Model<CompanyPartner>,
  ) {}

  async create(
    user: AuthUser,
    companyPartnerDto: CompanyPartnerDto,
  ): Promise<any> {
    const company = await this.companyService.findOne({ _id: user.companyId });
    if (!company) throw new NotFoundException('Company not found');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newPartner = new this.companyPartnerModel();
    Object.assign(newPartner, companyPartnerDto);
    newPartner.company = company;

    return await newPartner.save();
  }

  async update(
    user: AuthUser,
    companyPartnerDto: Partial<CompanyPartnerDto>,
    partnerId,
  ): Promise<any> {
    const company = await this.companyService.findOne({ _id: user.companyId });
    if (!company) throw new NotFoundException('Company not found');

    const realPartner = await this.companyPartnerModel.findOne({
      _id: partnerId,
      company: company,
    });
    if (!realPartner) throw new NotFoundException('Partner not found!');

    Object.assign(realPartner, companyPartnerDto);

    return await realPartner.save();
  }

  async destroy(user: AuthUser, partnerId): Promise<any> {
    const company = await this.companyService.findOne({ _id: user.companyId });
    if (!company) throw new NotFoundException('Company not found');

    const realPartner = await this.companyPartnerModel.findOne({
      _id: partnerId,
      company: company,
    });
    if (!realPartner) throw new NotFoundException('Partner not found!');

    await this.companyPartnerModel.deleteOne({
      _id: partnerId,
      company: company,
    });
  }
}
