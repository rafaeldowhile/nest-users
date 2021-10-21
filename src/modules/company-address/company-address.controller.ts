import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyAddressService } from './company-address.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompanyAddressDto } from './dtos/company-address.dto';

@Controller({
  path: '/company/:id/address',
})
export class CompanyAddressController {
  constructor(private readonly companyAddressService: CompanyAddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(
    @Param('id') companyId: string,
    @Body() companyAddressDto: CompanyAddressDto,
    @Req() req,
  ): Promise<any> {
    return this.companyAddressService.create(
      req.user.companyId,
      companyId,
      companyAddressDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('')
  async update(
    @Param('id') companyId: string,
    @Body() companyAddressDto: CompanyAddressDto,
    @Req() req,
  ): Promise<any> {
    return this.companyAddressService.update(
      req.user.companyId,
      companyId,
      companyAddressDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async get(
    @Param('id') companyId: string,
    @Body() companyAddressDto: CompanyAddressDto,
    @Req() req,
  ): Promise<any> {
    return this.companyAddressService.findOne(req.user.companyId, companyId);
  }
}
