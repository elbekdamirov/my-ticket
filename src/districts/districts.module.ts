import { Module } from "@nestjs/common";
import { DistrictsService } from "./districts.service";
import { DistrictsController } from "./districts.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { District, DistrictSchema } from "./schemas/district.schema";
import { Region, RegionSchema } from "../region/schemas/region.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: District.name,
        schema: DistrictSchema,
      },
      {
        name: Region.name,
        schema: RegionSchema,
      },
    ]),
  ],
  controllers: [DistrictsController],
  providers: [DistrictsService],
})
export class DistrictsModule {}
