import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Role } from 'generated/prisma';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
@Controller('api/v1/users')
@UseGuards(JwtAuthGuard,RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
   @Roles(Role.ADMIN)
   async findOne(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Post()
   @Roles(Role.ADMIN)
   async create(@Body() createUserDto: CreateUserDto) {
    return  await this.usersService.create(createUserDto);
  }

    // Otra ruta abierta para todos los autenticados
  @Get('me')
  getMyProfile() {
    return 'Ruta accesible a cualquier usuario autenticado';
  }
}
