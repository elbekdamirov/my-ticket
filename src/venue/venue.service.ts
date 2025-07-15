import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Venue } from "./schema/venue.schema";
import { isValidObjectId, Model } from "mongoose";
import { Region } from "../region/schemas/region.schema";
import { District } from "../districts/schemas/district.schema";

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue.name) private venueSchema: Model<Venue>,
    @InjectModel(Region.name) private regionSchema: Model<Region>,
    @InjectModel(District.name) private districtSchema: Model<District>
  ) {}

  async create(createVenueDto: CreateVenueDto) {
    const { region_id, district_id } = createVenueDto;
    if (!isValidObjectId(region_id)) {
      throw new BadRequestException("Region ID noto'g'ri");
    }
    const region = await this.regionSchema.findById(region_id);
    if (!region) {
      throw new BadRequestException("Bunday Region yo'q");
    }

    if (!isValidObjectId(district_id)) {
      throw new BadRequestException("District ID noto'g'ri");
    }
    const district = await this.districtSchema.findById(district_id);
    if (!district) {
      throw new BadRequestException("Bunday District yo'q");
    }

    const venue = this.venueSchema.create(createVenueDto);
    return venue;
  }

  findAll() {
    return this.venueSchema
      .find()
      .populate("region_id")
      .populate("district_id");
  }

  findOne(id: string) {
    return this.venueSchema
      .findById(id)
      .populate("region_id")
      .populate("district_id");
  }

  update(id: string, updateVenueDto: UpdateVenueDto) {
    return this.venueSchema.findByIdAndUpdate(id, updateVenueDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.venueSchema.findByIdAndDelete(id);
  }
}
