import mongoose from "mongoose";

export class CreateVenueTypeDto {
  venue_id: mongoose.Types.ObjectId;
  type_id: mongoose.Types.ObjectId;
}
