import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Customer } from "../../customer/schemas/customer.schema";

export type CustomerCardDocument = HydratedDocument<CustomerCard>;

@Schema({ versionKey: false, timestamps: true })
export class CustomerCard {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Customer",
    required: true,
  })
  customer_id: Customer;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  number: string;

  @Prop()
  year: string;

  @Prop()
  month: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_main: boolean;
}

export const CustomerCardSchema = SchemaFactory.createForClass(CustomerCard);
