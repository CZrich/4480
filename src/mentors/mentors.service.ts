import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PromoteToMentorDto } from './dto/promote-to-mentor.dto';
import { Role } from 'generated/prisma';
@Injectable()
export class MentorsService {
  constructor(private readonly prisma: PrismaService) { }

  async promoteToMentor(userId: string, dto: PromoteToMentorDto) {
    const existingMentor = await this.prisma.mentor.findUnique({
      where: { id: userId },
    });

    if (existingMentor) return existingMentor;

    // Actualiza rol del usuario
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: Role.MENTOR },
    });

    // Crea el mentor
    const mentor = await this.prisma.mentor.create({
      data: {
        id: userId,
        bio: dto.bio,
      },

    });
  // Si hay áreas de expertise, las crea
  console.log("lista",dto.expertise);
  if (dto.expertise?.length) {
    await this.prisma.expertise.createMany({
      data: dto.expertise.map((name) => ({
        name,
        mentorId: mentor.id,
      })),
    });
  }

    return{
      message:"asda mentor created",
      mentor: mentor.id,
    }
  }

  async findAll() {
    return this.prisma.mentor.findMany({
      include: { user: true, expertise: true },
    });
  }

  async findOne(id: string) {
    const mentor = await this.prisma.mentor.findUnique({
      where: { id },
      include: { user: true, expertise: true },
    });

    if (!mentor) throw new NotFoundException('Mentor not found');
    return mentor;
  }

  async remove(id: string) {
    return this.prisma.mentor.delete({ where: { id } });
  }
 

  async updateMentor(userId: string, dto: PromoteToMentorDto) {
  const mentor = await this.prisma.mentor.findUnique({
    where: { id: userId },
  });

  if (!mentor) throw new NotFoundException('Mentor not found');

  // Actualiza la bio si se provee
  if (dto.bio) {
    await this.prisma.mentor.update({
      where: { id: userId },
      data: { bio: dto.bio },
    });
  }

  // Si hay expertise, eliminamos las anteriores y creamos nuevas
  if (dto.expertise) {
    // Elimina las existentes
    await this.prisma.expertise.deleteMany({
      where: { mentorId: userId },
    });

    // Crea nuevas
    await this.prisma.expertise.createMany({
      data: dto.expertise.map((name) => ({
        name,
        mentorId: userId,
      })),
    });
  }

  return { message: 'Mentor updated successfully' };
}
}
