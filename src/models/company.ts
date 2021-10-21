import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Address } from './address';
import { AppDocumentFile } from './app-document-file';
import { Country } from './country';
import { CompanyPartner } from './company-partner';

@Schema({
  timestamps: true,
})
export class Company extends mongoose.Document {
  // Razão Social
  @Prop()
  companyName: string;

  // Nome Fantasia
  @Prop()
  tradingName: string;

  // CNPJ | Employer Identification Number
  @Prop()
  ein: string;

  // Federal Tax Identification Number
  @Prop()
  ftin: string;

  // Ramo de Atuação
  @Prop()
  fieldOfActivity: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  isForeignCompany: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
  country: Country;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'AppDocumentFile' })
  documents: AppDocumentFile[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
