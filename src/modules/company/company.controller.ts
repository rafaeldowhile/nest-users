import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompanyDto } from './dto/company.dto';

@Controller({
  path: '/company',
})
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Req() req): Promise<any> {
    return this.companyService.findOne(
      { _id: req.user.companyId },
      {},
      { populate: ['address'] },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() companyDto: CompanyDto, @Req() req): Promise<any> {
    return this.companyService.create(req.user, companyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() companyDto: CompanyDto, @Req() req): Promise<any> {
    return this.companyService.update(req.user, companyDto);
  }
}
