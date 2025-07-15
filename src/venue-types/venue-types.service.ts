import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateVenueTypeDto } from "./dto/create-venue-type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue-type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { VenueTypes } from "./schemas/venue-type.schema";
import { isValidObjectId, Model } from "mongoose";
import { Venue } from "../venue/schema/venue.schema";
import { Type } from "../types/schemas/type.schema";

@Injectable()
export class VenueTypesService {
  constructor(
    @InjectModel(Venue.name) private venueSchema: Model<Venue>,
    @InjectModel(VenueTypes.name) private venueTypesSchema: Model<VenueTypes>,
    @InjectModel(Type.name) private typesSchema: Model<Type>
  ) {}

  async create(createVenueTypeDto: CreateVenueTypeDto) {
    const { venue_id, type_id } = createVenueTypeDto;

    if (!isValidObjectId(venue_id)) {
      throw new BadRequestException("Venue ID noto'g'ri");
    }
    if (!isValidObjectId(type_id)) {
      throw new BadRequestException("Type ID noto'g'ri");
    }
    const venue = this.venueSchema.findById(venue_id);
    if (!venue) {
      throw new BadRequestException("Bunday Venue yo'q");
    }
    const type = this.typesSchema.findById(type_id);
    if (!type) {
      throw new BadRequestException("Bunday Type yo'q");
    }
    const venueType = this.venueTypesSchema.create(createVenueTypeDto);
    return venueType;
  }

  findAll() {
    return this.venueTypesSchema.find();
  }

  findOne(id: string) {
    return this.venueTypesSchema.findById(id);
  }

  update(id: string, updateVenueTypeDto: UpdateVenueTypeDto) {
    return this.venueTypesSchema.findByIdAndUpdate(id, updateVenueTypeDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.venueTypesSchema.findByIdAndDelete(id);
  }
}
