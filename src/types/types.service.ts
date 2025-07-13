import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Type } from "./schemas/type.schema";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(Type.name)
    private readonly typeSchema: Model<Type>
  ) {}

  async create(createTypeDto: CreateTypeDto) {
    return this.typeSchema.create(createTypeDto);
  }

  async findAll() {
    return this.typeSchema.find();
  }

  async findOne(id: string) {
    return this.typeSchema.findById(id);
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    return this.typeSchema.findByIdAndUpdate(id, updateTypeDto, { new: true });
  }

  async remove(id: string) {
    return this.typeSchema.findByIdAndDelete(id);
  }
}
