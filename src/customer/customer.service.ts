import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./schemas/customer.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerService: Model<Customer>
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { password, confirm_password } = createCustomerDto;

    if (password !== confirm_password) {
      new BadRequestException("Passwords didn't match");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.customerService.create({
      ...createCustomerDto,
      hashed_password,
    });
  }

  findByEmail(email: string) {
    return this.customerService.findOne({ email });
  }

  findAll() {
    return this.customerService.find();
  }

  findOne(id: string) {
    return this.customerService.findById(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.findByIdAndUpdate(id, updateCustomerDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.customerService.findByIdAndDelete(id);
  }

  async updateRefreshToken(id: string, refresh_token: string) {
    const updatedCustomer = await this.customerService.findByIdAndUpdate(
      id,
      { hashed_refresh_token: refresh_token },
      { new: true }
    );
    return updatedCustomer;
  }
}
