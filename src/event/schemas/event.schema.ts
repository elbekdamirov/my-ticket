// schemas/event.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Lang } from "../../lang/schemas/lang.schema";
import { HumanCategory } from "../../human-category/schemas/human-category.schema";
import { Venue } from "../../venue/schema/venue.schema";
import { EventType } from "../../event-type/schemas/event-type.schema";

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop()
  name: number;

  @Prop()
  photo: string;

  @Prop()
  start_date: Date;

  @Prop()
  start_time: string;

  @Prop()
  finish_date: Date;

  @Prop()
  finish_time: string;

  @Prop()
  info: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventType",
    required: true,
  })
  event_type_id: EventType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "HumanCategory",
    required: true,
  })
  human_category_id: HumanCategory;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true })
  venue_id: Venue;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Lang", required: true })
  lang_id: Lang;

  @Prop()
  release_date: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
