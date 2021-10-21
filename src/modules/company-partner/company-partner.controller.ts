import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyPartnerService } from './company-partner.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompanyPartnerDto } from './dtos/company-partner.dto';

@Controller({
  path: '/company/partners',
})
export class CompanyPartnerController {
  constructor(private readonly companyPartnerService: CompanyPartnerService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(
    @Param('id') companyId,
    @Body() companyPartnerDto: CompanyPartnerDto,
    @Req() req,
  ): Promise<any> {
    return this.companyPartnerService.create(req.user, companyPartnerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:partnerId')
  async update(
    @Param('partnerId') partnerId,
    @Body() companyPartnerDto: CompanyPartnerDto,
    @Req() req,
  ): Promise<any> {
    return this.companyPartnerService.update(
      req.user,
      companyPartnerDto,
      partnerId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:partnerId')
  async destroy(@Param('partnerId') partnerId, @Req() req): Promise<any> {
    return this.companyPartnerService.destroy(req.user, partnerId);
  }
}
