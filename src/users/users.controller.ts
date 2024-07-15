import { Controller, Get, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';

import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ValidRoles } from '../auth/enums/valid-roles.enum';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<User[]> {
    return this.usersService.findAll( paginationDto );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  blockUser(@Param('id') id: string): Promise<User> {
    return this.usersService.blockUser(id);
  }

}
