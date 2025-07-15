import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { District } from "../../districts/schemas/district.schema";
import { Region } from "../../region/schemas/region.schema";

export type VenueDocument = HydratedDocument<Venue>;

@Schema({ versionKey: false, timestamps: false })
export class Venue {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  location: string;

  @Prop()
  site: string;

  @Prop()
  phone: string;

  @Prop()
  schema: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  })
  region_id: Region;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
  })
  district_id: District;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
