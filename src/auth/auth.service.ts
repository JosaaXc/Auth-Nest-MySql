import { Injectable, NotFoundException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService
  ) {}

  async signup(signupDto: SignupDto) {

    const { password, ...userData } = signupDto; 
    const user = await this.usersService.create({
      ...userData,
      password: bcryptjs.hashSync(password, 10),
    });
    delete user.password;

    return user;
    
  }


  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail( email );
    if(!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if(!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }

    return user;
  }
}
