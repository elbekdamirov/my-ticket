import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ versionKey: false, timestamps: false })
export class Customer {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone_number: string;

  @Prop()
  hashed_password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  birth_date: Date;

  @Prop()
  gender: string;

  @Prop()
  lang_id: string;

  @Prop()
  hashed_refresh_token: string;

  @Prop({ default: false })
  is_active: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
