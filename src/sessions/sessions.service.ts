import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionStatusDto } from './dto/update-status.dto';
import { SessionStatus } from 'generated/prisma';


@Injectable()
export class SessionsService {



     constructor(private prisma: PrismaService) {}

  async createSession(dto: CreateSessionDto ){//, menteeId: string) {
    return this.prisma.session.create({
      data: {
        date: new Date(dto.date),
        topic: dto.topic,
        mentorId: dto.mentorId,
        menteeId:dto.menteeId, // Use provided menteeId or the one from the request
        status: SessionStatus.PENDING, // Default status when creating a session
      },
    });
  }

  async updateStatus(sessionId: string, dto: UpdateSessionStatusDto, mentorId: string) {
    const session = await this.prisma.session.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Session not found');
    console.log('mentor de session:', session.mentorId);
    console.log('Mentor ID obtendo:', mentorId);
    if (session.mentorId !== mentorId) throw new ForbiddenException('Not your session');

    return this.prisma.session.update({
      where: { id: sessionId },
      data: { status: dto.status },
    });
  }

  async getMentorSessions(mentorId: string) {
    return this.prisma.session.findMany({ where: { mentorId } });
  }

  async getMenteeSessions(menteeId: string) {
    return this.prisma.session.findMany({ where: { menteeId } });
  }
}
