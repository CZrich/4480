import {Role} from '@prisma/client'
//import { Role } from '../common/emuns/role.enum';
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: Role;
}
