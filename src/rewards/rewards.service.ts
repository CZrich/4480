import { Injectable,NotFoundException,ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { GiveRewardDto } from './dto/give-reward.dto';
@Injectable()
export class RewardsService {


    constructor(private readonly prisma: PrismaService) { }
    
    async giveRewardToMentor(menteeId: string, dto: GiveRewardDto) {
        const session = await this.prisma.session.findUnique({
            where: { id: dto.sessionId },
            include: { mentor: true },
        });

        if (!session) throw new NotFoundException('Session not found');
        if (session.menteeId !== menteeId) throw new ForbiddenException('You did not participate in this session');

        const mentorId = session.mentorId;

        let reward = await this.prisma.reward.findFirst({ where: { userId: mentorId } });

        if (!reward) {
            reward = await this.prisma.reward.create({
                data: {
                    userId: mentorId,
                    points: dto.points,
                    badge: dto.badge,
                },
            });
        } else {
            reward = await this.prisma.reward.update({
                where: { id: reward.id },
                data: {
                    points: reward.points + dto.points,
                    badge: dto.badge ?? reward.badge,
                },
            });
        }

        return reward;
    }
    async getMyReward(userId: string) {
        return this.prisma.reward.findFirst({ where: { userId } });
    }

    async getAll() {
        return this.prisma.reward.findMany({ include: { user: true } });
    }

    async addPoints(userId: string, dto: CreateRewardDto) {
        let reward = await this.prisma.reward.findFirst({ where: { userId } });

        if (!reward) {
            reward = await this.prisma.reward.create({
                data: { userId, points: dto.points, badge: dto.badge },
            });
        } else {
            reward = await this.prisma.reward.update({
                where: { id: reward.id },
                data: {
                    points: reward.points + dto.points,
                    badge: dto.badge ?? reward.badge,
                },
            });
        }

        return reward;
    }

    async delete(id: string) {
        return this.prisma.reward.delete({ where: { id } });
    }
}
