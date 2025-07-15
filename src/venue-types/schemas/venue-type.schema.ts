import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Venue } from "../../venue/schema/venue.schema";
import { Type } from "../../types/schemas/type.schema";

export type VenueTypesDocument = HydratedDocument<VenueTypes>;

@Schema({ versionKey: false, timestamps: false })
export class VenueTypes {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: "Venue",
  })
  venue_id: Venue;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: "Type",
  })
  type_id: Type;
}

export const VenueTypesSchema = SchemaFactory.createForClass(VenueTypes);
