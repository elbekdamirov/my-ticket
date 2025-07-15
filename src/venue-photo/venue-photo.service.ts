import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateVenuePhotoDto } from "./dto/create-venue-photo.dto";
import { UpdateVenuePhotoDto } from "./dto/update-venue-photo.dto";
import { InjectModel } from "@nestjs/mongoose";
import { VenuePhoto } from "./schemas/venue-photo.schema";
import { isValidObjectId, Model } from "mongoose";
import { Venue } from "../venue/schema/venue.schema";

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto.name) private venuePhotoSchema: Model<VenuePhoto>,
    @InjectModel(Venue.name) private venueSchema: Model<Venue>
  ) {}

  async create(createVenuePhotoDto: CreateVenuePhotoDto) {
    const { venue_id } = createVenuePhotoDto;

    if (!isValidObjectId(venue_id)) {
      throw new BadRequestException("Venue ID noto'g'ri");
    }

    const venue = this.venueSchema.findById(venue_id);
    if (!venue) {
      throw new BadRequestException("Bunday Venue yo'q");
    }

    const venuePhoto = this.venuePhotoSchema.create(createVenuePhotoDto);
    return venuePhoto;
  }

  findAll() {
    return this.venuePhotoSchema.find().populate("venue_id");
  }

  findOne(id: string) {
    return this.venuePhotoSchema.findById(id).populate("venue_id");
  }

  update(id: string, updateVenuePhotoDto: UpdateVenuePhotoDto) {
    return this.venuePhotoSchema.findByIdAndUpdate(id, updateVenuePhotoDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.venuePhotoSchema.findByIdAndDelete(id);
  }
}
