import { Controller, Post, Param, Get, Delete, Body, UseGuards ,Put} from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PromoteToMentorDto } from './dto/promote-to-mentor.dto';
@Controller('api/v1/mentors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MentorsController {


    constructor(private readonly mentorsService: MentorsService) {}

  @Post(':userId/promote')
  @Roles('ADMIN')
  promote(@Param('userId') userId: string, @Body() dto:PromoteToMentorDto) {
    return this.mentorsService.promoteToMentor(userId, dto);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.mentorsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.mentorsService.findOne(id);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.mentorsService.remove(id);
  }

  @Put(':userId')
@Roles('ADMIN', 'MENTOR')
updateMentor(@Param('userId') userId: string, @Body() dto: PromoteToMentorDto,
) {
  return this.mentorsService.updateMentor(userId, dto);
}
}
