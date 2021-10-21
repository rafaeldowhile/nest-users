import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(`validateUser ${username}`);
    const user = await this.userService.findUser({ email: username });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: any) {
    const { email, password } = user;
    return {
      access_token: this.jwtService.sign({
        email: email,
        password: password,
      }),
    };
  }
}
