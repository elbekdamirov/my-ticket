import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Seat } from "./schemas/seat.schema";
import { isValidObjectId, Model } from "mongoose";
import { SeatType } from "../seat-type/schemas/seat-type.schema";
import { Venue } from "../venue/schema/venue.schema";

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat.name) private seatSchema: Model<Seat>,
    @InjectModel(SeatType.name) private seatTypeSchema: Model<SeatType>,
    @InjectModel(Venue.name) private venueSchema: Model<Venue>
  ) {}

  async create(createSeatDto: CreateSeatDto) {
    const { seat_type_id, venue_id } = createSeatDto;

    if (!isValidObjectId(seat_type_id)) {
      throw new BadRequestException("SeatType ID noto'g'ri");
    }
    const seatType = await this.seatTypeSchema.findById(seat_type_id);
    if (!seatType) {
      throw new BadRequestException("Bunday SeatType yo'q");
    }

    if (!isValidObjectId(venue_id)) {
      throw new BadRequestException("Venue ID noto'g'ri");
    }
    const venue = await this.venueSchema.findById(venue_id);
    if (venue) {
      throw new BadRequestException("Bunday Venue yo'q");
    }

    const seat = this.seatSchema.create(createSeatDto);
    return seat;
  }

  findAll() {
    return this.seatSchema.find();
  }

  findOne(id: string) {
    return this.seatSchema.findById(id);
  }

  update(id: string, updateSeatDto: UpdateSeatDto) {
    return this.seatSchema.findByIdAndUpdate(id, updateSeatDto, { new: true });
  }

  remove(id: string) {
    return this.seatSchema.findByIdAndDelete(id);
  }
}
