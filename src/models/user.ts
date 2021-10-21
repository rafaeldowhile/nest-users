import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Country } from './country';
import { Address } from './address';
import { AppDocumentFile } from './app-document-file';
import { IdentityDocument, IdentityDocumentSchema } from './identity-document';
import { Exclude } from 'class-transformer';
import { AppUserStatus } from '../common/enums/app-user-status';
import { AppUserType } from '../common/enums/app-user-type';
import { Company } from './company';

@Schema({
  timestamps: true,
})
export class User extends mongoose.Document {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop({
    type: mongoose.Schema.Types.Date,
  })
  dateOfBirth: Date;

  @Prop({
    type: IdentityDocumentSchema,
  })
  identityDocument: IdentityDocument;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop({
    type: mongoose.Schema.Types.Number,
    enum: AppUserStatus,
    get: (enumValue: number) => enumValue as AppUserStatus,
  })
  @Exclude()
  status: number;

  @Prop({
    enum: AppUserType,
    get: (enumValue: string) => enumValue as AppUserType,
    set: (enumValue: AppUserType) => enumValue.toString(),
  })
  userType: AppUserType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
  country: Country;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'AppDocumentFile' })
  documents: AppDocumentFile[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;
}

export const UserSchema = SchemaFactory.createForClass(User);
