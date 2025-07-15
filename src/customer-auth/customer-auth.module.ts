import { Module } from "@nestjs/common";
import { CustomerAuthService } from "./customer-auth.service";
import { CustomerAuthController } from "./customer-auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { CustomerModule } from "../customer/customer.module";

@Module({
  imports: [JwtModule.register({}), CustomerModule],
  controllers: [CustomerAuthController],
  providers: [CustomerAuthService],
})
export class CustomerAuthModule {}
