import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type EventTypeDocument = EventType & Document;

@Schema({ timestamps: true })
export class EventType {
  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventType",
    default: null,
  })
  parent_event_type_id: mongoose.Schema.Types.ObjectId | null;
}

export const EventTypeSchema = SchemaFactory.createForClass(EventType);
