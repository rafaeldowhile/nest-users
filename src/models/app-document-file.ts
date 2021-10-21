import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AppDocumentType } from '../common/enums/app-document-type';
import { AppDocumentDirection } from '../common/enums/app-document-direction';
import { User } from './user';

@Schema({
  timestamps: true,
})
export class AppDocumentFile extends mongoose.Document {
  @Prop({
    type: mongoose.Schema.Types.String,
  })
  filename: string;

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
    enum: AppDocumentDirection,
    get: (enumValue: string) =>
      AppDocumentDirection[enumValue as keyof typeof AppDocumentDirection],
    set: (enumValue: AppDocumentDirection) => AppDocumentDirection[enumValue],
  })
  documentDirection: AppDocumentDirection;

  @Prop({
    type: mongoose.Schema.Types.Map,
  })
  aws: {
    key: string;
    url: string;
  };

  @Prop({
    type: mongoose.Schema.Types.Boolean,
    default: false,
  })
  isValidated: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  approvedBy: User;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const AppDocumentFileSchema = SchemaFactory.createForClass(AppDocumentFile);
