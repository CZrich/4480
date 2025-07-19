import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ExpertiseService } from './expertise.service';
import { Post, Param, Get, Delete, Body, UseGuards } from '@nestjs/common';

@Controller('api/v1/expertise')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExpertiseController {



    constructor(private readonly expertiseService: ExpertiseService) { }

    @Post(':mentorId')
    @Roles('ADMIN')
    create(@Param('mentorId') mentorId: string, @Body('name') name: string) {
        return this.expertiseService.create(mentorId, name);
    }

    @Get(':mentorId')
    @Roles('ADMIN')
    findByMentor(@Param('mentorId') mentorId: string) {
        return this.expertiseService.findAllByMentor(mentorId);
    }

    @Delete(':id')
    @Roles('ADMIN')
    delete(@Param('id') id: string) {
        return this.expertiseService.delete(id);
    }
}
