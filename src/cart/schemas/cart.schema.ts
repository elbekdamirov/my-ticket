import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Customer } from "../../customer/schemas/customer.schema";

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Cart extends Document {
  @Prop({ ref: "Customer", required: true })
  customer_id: Customer;

  @Prop({ type: Date, default: null })
  finishedAt: Date;

  @Prop({ type: Number, required: true })
  status_id: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
