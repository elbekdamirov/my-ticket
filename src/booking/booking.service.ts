import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Booking } from "./schema/booking.schema";
import { Model } from "mongoose";

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingSchema: Model<Booking>
  ) {}

  create(createBookingDto: CreateBookingDto) {
    return this.bookingSchema.create(createBookingDto);
  }

  findAll() {
    return this.bookingSchema.find();
  }

  findOne(id: string) {
    return this.bookingSchema.findById(id);
  }

  update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.bookingSchema.findByIdAndUpdate(id, updateBookingDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.bookingSchema.findByIdAndDelete(id);
  }
}
