import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventSchema: Model<Event>
  ) {}

  create(createEventDto: CreateEventDto) {
    return this.eventSchema.create(createEventDto);
  }

  findAll() {
    return this.eventSchema.find();
  }

  findOne(id: string) {
    return this.eventSchema.findById(id);
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventSchema.findByIdAndUpdate(id, updateEventDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.eventSchema.findByIdAndDelete(id);
  }
}
