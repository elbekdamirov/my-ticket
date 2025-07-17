import { Injectable } from "@nestjs/common";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CartItem } from "./schemas/cart-item.schema";
import { Model } from "mongoose";

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem.name) private cartItemSchema: Model<CartItem>
  ) {}

  create(createCartItemDto: CreateCartItemDto) {
    return this.cartItemSchema.create(createCartItemDto);
  }

  findAll() {
    return this.cartItemSchema.find();
  }

  findOne(id: string) {
    return this.cartItemSchema.findById(id);
  }

  update(id: string, updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemSchema.findByIdAndUpdate(id, updateCartItemDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.cartItemSchema.findByIdAndDelete(id);
  }
}
