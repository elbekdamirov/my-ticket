import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CustomerAddress,
  CustomerAddressDocument,
} from "./schemas/customer-address.schema";
import { Model } from "mongoose";
import { CreateCustomerAddressDto } from "./dto/create-customer-address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer-address.dto";

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress.name)
    private addressModel: Model<CustomerAddressDocument>
  ) {}

  create(dto: CreateCustomerAddressDto) {
    return this.addressModel.create(dto);
  }

  findAll() {
    return this.addressModel.find();
  }

  findOne(id: string) {
    return this.addressModel.findById(id);
  }

  update(id: string, dto: UpdateCustomerAddressDto) {
    return this.addressModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.addressModel.findByIdAndDelete(id);
  }
}
