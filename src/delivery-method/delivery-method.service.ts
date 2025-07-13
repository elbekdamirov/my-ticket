import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeliveryMethod } from "./schemas/delivery-method.schema";
import { CreateDeliveryMethodDto } from "./dto/create-delivery-method.dto";
import { UpdateDeliveryMethodDto } from "./dto/update-delivery-method.dto";

@Injectable()
export class DeliveryMethodService {
  constructor(
    @InjectModel(DeliveryMethod.name)
    private readonly deliveryMethodSchema: Model<DeliveryMethod>
  ) {}
  create(createDeliveryMethodDto: CreateDeliveryMethodDto) {
    const candidate = this.deliveryMethodSchema.findOne({
      name: createDeliveryMethodDto.name,
    });

    if (!candidate) {
      throw new Error("Bunday deliveryMethod allaqachon mavjud");
    }

    return this.deliveryMethodSchema.create(createDeliveryMethodDto);
  }

  findAll() {
    return this.deliveryMethodSchema.find();
  }

  findOne(id: string) {
    return this.deliveryMethodSchema.findById(id);
  }

  update(id: string, updateDeliveryMethodDto: UpdateDeliveryMethodDto) {
    return this.deliveryMethodSchema.findByIdAndUpdate(
      id,
      updateDeliveryMethodDto,
      {
        new: true,
      }
    );
  }

  remove(id: string) {
    return this.deliveryMethodSchema.findByIdAndDelete(id);
  }
}
