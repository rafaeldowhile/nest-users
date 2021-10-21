import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AppDocumentType } from '../common/enums/app-document-type';

@Schema({
  timestamps: true,
})
export class IdentityDocument {
  @Prop({
    type: mongoose.Schema.Types.String,
    enum: AppDocumentType,
    get: (enumValue: string) =>
      AppDocumentType[enumValue as keyof typeof AppDocumentType],
    set: (enumValue: AppDocumentType) => AppDocumentType[enumValue],
  })
  documentType: AppDocumentType;
  @Prop({
    type: mongoose.Schema.Types.String,
  })
  documentValue: string;
}

export const IdentityDocumentSchema =
  SchemaFactory.createForClass(IdentityDocument);
