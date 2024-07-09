import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy ],
  exports: [ JwtStrategy, PassportModule, JwtModule ],
  imports: [
    
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      useFactory: () => ({
        secret: envs.jwtSecret,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  
    UsersModule,
  ],
})
export class AuthModule {}
