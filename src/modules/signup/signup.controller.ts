import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './dto/signup.dto';
import { User } from '../../models/user';

@Controller({
  path: '/signup',
})
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signup(@Body() createUserDto: SignupDto): Promise<User> {
    return await this.signupService.signup(createUserDto);
  }
}
