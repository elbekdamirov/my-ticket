import { Module } from "@nestjs/common";
import { CustomerAddressService } from "./customer-address.service";
import { CustomerAddressController } from "./customer-address.controller";
import {
  CustomerAddress,
  CustomerAddressSchema,
} from "./schemas/customer-address.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerAddress.name, schema: CustomerAddressSchema },
    ]),
  ],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
})
export class CustomerAddressModule {}
