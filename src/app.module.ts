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
import { TicketStatusModule } from './ticket-status/ticket-status.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
