import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GeneralProfileDto } from './dto/general-profile.dto';
import { AuthUser } from '../../common/auth/auth-user';

@Controller({
  path: '/profile',
})
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Req() req): Promise<any> {
    return this.profileService.getByEmail(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/general')
  async update(
    @Body() generalProfileDto: GeneralProfileDto,
    @Req() req,
  ): Promise<any> {
    return this.profileService.update(req.user as AuthUser, generalProfileDto);
  }
}
