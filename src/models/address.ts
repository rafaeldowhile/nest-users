import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { City } from './city';

@Schema({
  timestamps: true,
})
export class Address extends mongoose.Document {
  @Prop()
  street: string;
  @Prop()
  number: string;
  @Prop()
  district: string;
  @Prop()
  postalCode: string;
  @Prop()
  addressLine1: string;
  @Prop()
  addressLine2: string;
  @Prop()
  addressLine3: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  city: City;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
