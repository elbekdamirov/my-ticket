import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CustomerService } from "../customer/customer.service";
import { CustomerDocument } from "../customer/schemas/customer.schema";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";
import { LoginCustomerDto } from "../customer/dto/login-customer.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class CustomerAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService
  ) {}

  async generateTokens(customer: CustomerDocument) {
    const payload = {
      id: customer._id,
      is_active: customer.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.CUSTOMER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.CUSTOMER_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.CUSTOMER_REFRESH_TOKEN_KEY,
        expiresIn: process.env.CUSTOMER_REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async registration(createCustomerDto: CreateCustomerDto) {
    const candidate = await this.customerService.findByEmail(
      createCustomerDto.email
    );
    if (candidate) {
      throw new ConflictException("This user already exists");
    }
    const customer = await this.customerService.create(createCustomerDto);
    return { customerId: customer._id };
  }

  async login(loginCustomerDto: LoginCustomerDto, res: Response) {
    const customer = await this.customerService.findByEmail(
      loginCustomerDto.email
    );
    if (!customer) {
      throw new UnauthorizedException("Email or password is incorrect");
    }

    const isMatch = await bcrypt.compare(
      loginCustomerDto.password,
      customer.hashed_password
    );

    if (!isMatch) {
      throw new UnauthorizedException("Email or password is incorrect");
    }

    const { accessToken, refreshToken } = await this.generateTokens(customer);
    customer.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await customer.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { customerId: customer._id, accessToken };
  }

  async logout(refreshToken: string, res: Response) {
    let customerData: any;
    try {
      customerData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }

    if (!customerData) {
      throw new ForbiddenException("User not verified");
    }

    await this.customerService.updateRefreshToken(customerData.id, "");

    res.clearCookie("refreshToken");
    return {
      message: "User logged out successfully",
    };
  }

  async refreshToken(
    userId: string,
    refreshTokenFromCookie: string,
    res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refreshTokenFromCookie);

    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }

    const user = await this.customerService.findOne(userId);

    if (!user || !user.hashed_refresh_token) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refreshTokenFromCookie,
      user.hashed_refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    user.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "User refreshed",
      userId: user.id,
      accessToken: accessToken,
    };
    return response;
  }
}
