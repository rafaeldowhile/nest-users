import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../models/user';
import { GeneralProfileDto } from './dto/general-profile.dto';
import { City } from '../../models/city';
import { Country } from '../../models/country';
import { IdentityDocument } from '../../models/identity-document';
import { AppDocumentType } from '../../common/enums/app-document-type';
import { getOnlyNumbers } from '../../common/utils/string';
import { Address } from '../../models/address';
import { AuthUser } from '../../common/auth/auth-user';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(City.name) private cityModel: Model<City>,
    @InjectModel(Country.name) private countryModel: Model<Country>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {
  }

  async update(
    user: AuthUser,
    generalProfileDto: GeneralProfileDto,
  ): Promise<any> {
    const realUser: User = await this.userModel.findById(
      user._id,
      {},
      { populate: ['address'] },
    );

    if (!realUser) throw new NotFoundException('User not found');

    const identityDocument = new IdentityDocument();
    identityDocument.documentType =
      AppDocumentType[generalProfileDto.identityDocument.documentType];
    identityDocument.documentValue = getOnlyNumbers(
      generalProfileDto.identityDocument.documentValue,
    );

    const country = await this.countryModel
      .findById(generalProfileDto.countryId)
      .exec();

    const updatedUser = new this.userModel(generalProfileDto);
    updatedUser._id = realUser._id;
    updatedUser.identityDocument = identityDocument;
    updatedUser.country = country;

    if (generalProfileDto.address) {
      const address = new this.addressModel(generalProfileDto.address);
      const city = await this.cityModel
        .findById(generalProfileDto.address.cityId)
        .exec();

      address.city = city;

      if (realUser.address == null) {
        await address.save();
        updatedUser.address = address;
      } else {
        const realAddress = await this.addressModel.findById(
          realUser.address._id,
        );

        address._id = realUser.address._id;

        await realAddress.updateOne(address);
      }
    }

    await realUser.updateOne(updatedUser);

    return this.userModel.findOne(
      { email: user.email },
      {},
      { populate: ['address'] },
    );
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
}
