import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IdentityDocument, IdentityDocumentSchema } from './identity-document';
import { Company } from './company';
import { AppDocumentFile } from './app-document-file';

@Schema({
  timestamps: true,
})
export class CompanyPartner extends mongoose.Document {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  // Cargo
  @Prop()
  jobTitle: string;

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'AppDocumentFile' })
  documents: AppDocumentFile[];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CompanyPartnerSchema = SchemaFactory.createForClass(CompanyPartner);
