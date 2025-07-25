import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { SeatTypeModule } from "./seat-type/seat-type.module";
import { TypesModule } from "./types/types.module";
import { LangModule } from "./lang/lang.module";
import { DeliveryMethodModule } from "./delivery-method/delivery-method.module";
import { PaymentMethodModule } from "./payment-method/payment-method.module";
import { RegionModule } from "./region/region.module";
import { TicketStatusModule } from "./ticket-status/ticket-status.module";
import { DistrictsModule } from "./districts/districts.module";
import { VenueModule } from "./venue/venue.module";
import { VenuePhotoModule } from "./venue-photo/venue-photo.module";
import { VenueTypesModule } from "./venue-types/venue-types.module";
import { CustomerModule } from "./customer/customer.module";
import { SeatModule } from "./seat/seat.module";
import { CustomerCardModule } from './customer-card/customer-card.module';
import { CustomerAddressModule } from './customer-address/customer-address.module';
import { CustomerAuthModule } from './customer-auth/customer-auth.module';
import { HumanCategoryModule } from './human-category/human-category.module';
import { EventTypeModule } from './event-type/event-type.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    AuthModule,
    SeatTypeModule,
    TypesModule,
    LangModule,
    DeliveryMethodModule,
    PaymentMethodModule,
    RegionModule,
    TicketStatusModule,
    DistrictsModule,
    VenueModule,
    VenuePhotoModule,
    VenueTypesModule,
    CustomerModule,
    SeatModule,
    CustomerCardModule,
    CustomerAddressModule,
    CustomerAuthModule,
    HumanCategoryModule,
    EventTypeModule,
    EventModule,
    TicketModule,
    CartModule,
    CartItemModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
