import { Controller, Post, Body, UseGuards, Request, Get, Param, Patch } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';;
import { Roles } from '../common/decorators/roles.decorator';
import { UpdateSessionStatusDto } from './dto/update-status.dto';
import { Role } from '@prisma/client';
@Controller('api/v1/sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SessionsController {


      constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @Roles(Role.MENTEE)
  create(@Body() dto: CreateSessionDto) {
    return this.sessionsService.createSession(dto);
  }

  @Patch(':id/status')
  @Roles(Role.MENTOR)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateSessionStatusDto, @Request() req) {
     console.log('Updating session status for session ID:', id);
        console.log('Request user ID:', req.user);
    return this.sessionsService.updateStatus(id, dto, req.user.sub);
  }

  @Get('mentor')
  @Roles(Role.MENTOR)
  getMentorSessions(@Request() req) {
    return this.sessionsService.getMentorSessions(req.user.sub);
  }

  @Get('mentee')
  @Roles(Role.MENTEE)
  getMenteeSessions(@Request() req) {
    return this.sessionsService.getMenteeSessions(req.user.sub);
  }
}
