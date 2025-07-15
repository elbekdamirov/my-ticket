import { Body, Controller, HttpCode, Param, Post, Res } from "@nestjs/common";
import { CustomerAuthService } from "./customer-auth.service";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";
import { LoginCustomerDto } from "../customer/dto/login-customer.dto";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { Response } from "express";

@Controller("customer-auth")
export class CustomerAuthController {
  constructor(private readonly customerAuthService: CustomerAuthService) {}

  @Post("registration")
  async registration(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerAuthService.registration(createCustomerDto);
  }

  @Post("login")
  async login(
    @Body() loginCustomerDto: LoginCustomerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.customerAuthService.login(loginCustomerDto, res);
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response): string {
    res.clearCookie("refreshToken");
    return "Logged out successfully";
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id") id: string,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.customerAuthService.refreshToken(id, refreshToken, res);
  }
}
