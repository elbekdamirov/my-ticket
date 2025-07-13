import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaymentMethod } from "./schemas/payment-method.entity";
import { CreatePaymentMethodDto } from "./dto/create-payment-method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment-method.dto";

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private readonly paymentMethodSchema: Model<PaymentMethod>
  ) {}
  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const candidate = await this.paymentMethodSchema.findOne({
      name: createPaymentMethodDto.name,
    });

    if (!candidate) {
      throw new Error("Bunday paymentMethod allaqachon mavjud");
    }

    return this.paymentMethodSchema.create(createPaymentMethodDto);
  }

  async findAll() {
    return this.paymentMethodSchema.find();
  }

  async findOne(id: string) {
    return this.paymentMethodSchema.findById(id);
  }

  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodSchema.findByIdAndUpdate(
      id,
      updatePaymentMethodDto,
      {
        new: true,
      }
    );
  }

  async remove(id: string) {
    return this.paymentMethodSchema.findByIdAndDelete(id);
  }
}
