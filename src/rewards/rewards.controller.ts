import { Controller, Get, Post, Delete, Param, Body, Request,UseGuards } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { GiveRewardDto } from './dto/give-reward.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
@Controller('api/v1/rewards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RewardsController {

    constructor(private readonly rewardsService: RewardsService) { }
    @Post('give')
    @Roles(Role.MENTEE)
    give(@Body() dto: GiveRewardDto, @Request() req) {
        return this.rewardsService.giveRewardToMentor(req.user.sub, dto);
    }

    @Get('my')
    @Roles(Role.MENTEE, Role.MENTOR)
    getMy(@Request() req) {
        return this.rewardsService.getMyReward(req.user.sub);
    }

    @Post(':userId/add')
    @Roles(Role.ADMIN)
    add(@Param('userId') userId: string, @Body() dto: CreateRewardDto) {
        return this.rewardsService.addPoints(userId, dto);
    }

    @Get()
    @Roles(Role.ADMIN)
    getAll() {
        return this.rewardsService.getAll();
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    delete(@Param('id') id: string) {
        return this.rewardsService.delete(id);
    }
}
