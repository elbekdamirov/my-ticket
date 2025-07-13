import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SeatType } from "./schemas/seat-type.schema";
import { CreateSeatTypeDto } from "./dto/create-seat-type.dto";
import { UpdateSeatTypeDto } from "./dto/update-seat-type.dto";

@Injectable()
export class SeatTypeService {
  constructor(
    @InjectModel(SeatType.name)
    private readonly seatTypeSchema: Model<SeatType>
  ) {}

  async create(createSeatTypeDto: CreateSeatTypeDto) {
    return this.seatTypeSchema.create(createSeatTypeDto);
  }

  async findAll() {
    return this.seatTypeSchema.find();
  }

  async findOne(id: string) {
    return this.seatTypeSchema.findById(id);
  }

  async update(id: string, updateSeatTypeDto: UpdateSeatTypeDto) {
    return this.seatTypeSchema.findByIdAndUpdate(id, updateSeatTypeDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.seatTypeSchema.findByIdAndDelete(id);
  }
}
