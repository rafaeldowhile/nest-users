import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { State } from './state';

@Schema({
  timestamps: true,
})
export class City extends mongoose.Document {
  @Prop()
  name: string;

  @Prop()
  ibgeCode: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'State' })
  state: State;
}

export const CitySchema = SchemaFactory.createForClass(City);
