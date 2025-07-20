import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { MenteesService} from "../mentees/mentees.service" // Assuming you have a MenteesService for mentee-related operations
import { UserDetailDto } from './dto/user.detail.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { Role } from 'generated/prisma';

@Injectable()
export class AuthService {


    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly menteesService: MenteesService, // Assuming you have a MentorsService for mentor-related operations
    
    ) {}
    
    async register(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
     

        const user = await this.usersService.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
            role:  Role.MENTEE,
        });
        
        if ((user.role ?? 'MENTEE') === 'MENTEE') {
            await this.menteesService.createMentee(user.id);
        }
        
        const userDto= new UserDetailDto({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, 
        });
         // Si el rol es MENTEE, crear también en la tabla mentees
 

    return userDto;
}
    
    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
        where: { email: loginDto.email },
        });
    
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
        }
    
        const payload = { 
            
     sub: user.id ,
    email: user.email,
    role: user.role
    
    };
       

        return new LoginResponseDto({
            jwt: this.jwtService.sign(payload),
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, // Assuming role is a string, adjust if it's an enum or different type
        });

    }


}
