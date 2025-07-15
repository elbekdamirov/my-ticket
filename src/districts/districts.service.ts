import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "./schemas/district.schema";
import { isValidObjectId, Model } from "mongoose";
import { Region } from "../region/schemas/region.schema";

@Injectable()
export class DistrictsService {
  constructor(
    @InjectModel(District.name) private districtSchema: Model<District>,
    @InjectModel(Region.name) private regionSchema: Model<Region>
  ) {}

  async create(createDistrictDto: CreateDistrictDto) {
    const { region_id } = createDistrictDto;
    if (!isValidObjectId(region_id)) {
      throw new BadRequestException("Region ID noto'g'ri");
    }
    const region = await this.regionSchema.findById(region_id);
    if (!region) {
      throw new BadRequestException("Bunday Region yo'q");
    }
    const district = await this.districtSchema.create(createDistrictDto);
    region.districts.push(district);
    await region.save();
    return district;
  }

  findAll() {
    return this.districtSchema.find().populate("region_id");
  }

  findOne(id: string) {
    return this.districtSchema.findById(id).populate("region_id");
  }

  update(id: string, updateDistrictDto: UpdateDistrictDto) {
    return this.districtSchema.findByIdAndUpdate(id, updateDistrictDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.districtSchema.findByIdAndDelete(id);
  }
}
