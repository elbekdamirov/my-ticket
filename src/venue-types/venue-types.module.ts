import { Module } from "@nestjs/common";
import { VenueTypesService } from "./venue-types.service";
import { VenueTypesController } from "./venue-types.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VenueTypes, VenueTypesSchema } from "./schemas/venue-type.schema";
import { Venue, VenueSchema } from "../venue/schema/venue.schema";
import { Type, TypeSchema } from "../types/schemas/type.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: VenueTypes.name,
        schema: VenueTypesSchema,
      },
      {
        name: Venue.name,
        schema: VenueSchema,
      },
      {
        name: Type.name,
        schema: TypeSchema,
      },
    ]),
  ],
  controllers: [VenueTypesController],
  providers: [VenueTypesService],
})
export class VenueTypesModule {}
