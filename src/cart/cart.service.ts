import { Injectable } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Cart } from "./schemas/cart.schema";
import { Model } from "mongoose";

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartSchema: Model<Cart>) {}

  create(createCartDto: CreateCartDto) {
    return this.cartSchema.create(createCartDto);
  }

  findAll() {
    return this.cartSchema.find();
  }

  findOne(id: string) {
    return this.cartSchema.findById(id);
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.cartSchema.findByIdAndUpdate(id, updateCartDto, { new: true });
  }

  remove(id: string) {
    return this.cartSchema.findByIdAndDelete(id);
  }
}
