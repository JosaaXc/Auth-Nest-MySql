import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { SignupDto } from './dto/signup.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
      throw new UnauthorizedException('Credentials not valid');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if(!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.getJwtToken(user.id)

    delete user.password;
    delete user.created_at;

    return {
      user,
      token,
    }
  }

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async validateUser( id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if( !user.isActive ) throw new UnauthorizedException('User is blocked');

    delete user.password;

    return user;
  }
}
