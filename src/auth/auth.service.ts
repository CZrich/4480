import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

import { UserDetailDto } from './dto/user.detail.dto';
import { LoginResponseDto } from './dto/login.response.dto';

@Injectable()
export class AuthService {


    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UsersService, // Asegúrate de importar UsersService si es necesario
    ) {}
    
    async register(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
     

        const user = await this.usersService.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
            role: registerDto.role || 'MENTEE',
        });
       
        return new UserDetailDto({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, 
        });
    }
    
    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
        where: { email: loginDto.email },
        });
    
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
        }
    
        const payload = { email: user.email, sub: user.id };
       

        return new LoginResponseDto({
            jwt: this.jwtService.sign({ id: user.id, email: user.email, role: user.role }),
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, // Assuming role is a string, adjust if it's an enum or different type
        });

    }


}
