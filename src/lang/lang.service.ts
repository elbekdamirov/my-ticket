import { Injectable } from "@nestjs/common";
import { CreateLangDto } from "./dto/create-lang.dto";
import { UpdateLangDto } from "./dto/update-lang.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lang } from "./schemas/lang.schema";

@Injectable()
export class LangService {
  constructor(
    @InjectModel(Lang.name) private readonly langSchema: Model<Lang>
  ) {}
  async create(createLangDto: CreateLangDto) {
    const candidate = await this.langSchema.findOne({
      name: createLangDto.name,
    });

    if (!candidate) {
      throw new Error("Bunday lang allaqachon mavjud");
    }
    return this.langSchema.create(createLangDto);
  }

  async findAll() {
    return this.langSchema.find();
  }

  async findOne(id: string) {
    return this.langSchema.findById(id);
  }

  async update(id: string, updateLangDto: UpdateLangDto) {
    return this.langSchema.findByIdAndUpdate(id, updateLangDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.langSchema.findByIdAndDelete(id);
  }
}
