import mongoose from "mongoose";

export class CreateVenuePhotoDto {
  url: string;
  venue_id: mongoose.Types.ObjectId;
}
