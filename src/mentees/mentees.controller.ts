import { Controller, Get, Param, Delete,UseGuards } from '@nestjs/common';
import { MenteesService } from './mentees.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
@Controller('api/v1/mentees')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenteesController {
  constructor(private readonly menteesService: MenteesService) {}

  @Get()
    @Roles('ADMIN')
  findAll() {
    return this.menteesService.finAllMentees();
  }

  @Get(':id')
    @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.menteesService.findMenteeById(id);
  }

  @Delete(':id')
    @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.menteesService.remove(id);
  }
}
