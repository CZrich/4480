import { Injectable , NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class MenteesService {




    constructor( private readonly prisma:PrismaService) {}



    async createMentee(userId:string) {
  // Verifica si ya existe
    const exists = await this.prisma.mentee.findUnique({
      where: { id: userId },
    });


     if (exists) return exists;

    // Crea el mentee
    return this.prisma.mentee.create({
      data: {
        id: userId,
      },
    });
    }


    async finAllMentees() {
      return this.prisma.mentee.findMany({
        include: {
          user: true
          
        },
      });
    }

    async findMenteeById(id: string) {
      const mentee =this.prisma.mentee.findUnique({
        where: { id },
        include: {
          user: true
        },
      });
      if (!mentee) throw new NotFoundException('Mentee not found');
    return mentee;

    }
      async remove(id: string) {
    return this.prisma.mentee.delete({ where: { id } });
  }
}
