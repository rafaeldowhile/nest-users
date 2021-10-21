import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class State {
  @Prop()
  name: string;
  @Prop()
  code: string;
}

export const StateSchema = SchemaFactory.createForClass(State);
