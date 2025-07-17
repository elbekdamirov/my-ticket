import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Cart } from "../../cart/schemas/cart.schema";
import { Ticket } from "../../ticket/schemas/ticket.schema";

@Schema({ timestamps: true })
export class CartItem extends Document {
  @Prop({ ref: "Cart", required: true })
  cart_id: Cart;

  @Prop({ ref: "Ticket", required: true })
  ticket_id: Ticket;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
