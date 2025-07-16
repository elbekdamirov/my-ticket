import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Event } from "../../event/schemas/event.schema";
import { Seat } from "../../seat/schemas/seat.schema";
import { TicketStatus } from "../../ticket-status/schemas/ticket-status.schema";

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true })
export class Ticket {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true })
  event_id: Event;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true })
  seat_id: Seat;

  @Prop()
  price: number;

  @Prop()
  service_fee: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "TicketStatus",
    required: true,
  })
  status_id: TicketStatus;

  @Prop()
  ticket_type: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
