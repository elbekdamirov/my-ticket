import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Cart } from "../../cart/schemas/cart.schema";
import { PaymentMethod } from "../../payment-method/schemas/payment-method.entity";
import { DeliveryMethod } from "../../delivery-method/schemas/delivery-method.schema";

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Booking extends Document {
  @Prop({ ref: "Cart", required: false })
  cart_id: Cart;

  @Prop({ default: null })
  finished: Date;

  @Prop({ ref: "PaymentMethod", required: true })
  payment_method_id: PaymentMethod;

  @Prop({ ref: "DeliveryMethod", required: true })
  delivery_method_id: DeliveryMethod;

  @Prop({ type: String, required: false })
  discount_coupon_id?: string;

  @Prop({ type: Number, required: true })
  status_id: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
