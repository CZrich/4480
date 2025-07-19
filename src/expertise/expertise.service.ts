import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
@Injectable()
export class ExpertiseService {



constructor(private readonly prisma: PrismaService) {}

  async create(mentorId: string, name: string) {
    // Verificamos si el mentor existe
    const mentor = await this.prisma.mentor.findUnique({
      where: { id: mentorId },
    });
    if (!mentor) throw new NotFoundException('Mentor not found');

    return this.prisma.expertise.create({
      data: {
        name,
        mentorId,
      },
    });
  }

  async findAllByMentor(mentorId: string) {
    return this.prisma.expertise.findMany({
      where: { mentorId },
    });
  }

  async delete(id: string) {
    return this.prisma.expertise.delete({
      where: { id },
    });
  }


}
