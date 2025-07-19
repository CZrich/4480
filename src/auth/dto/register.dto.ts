import { Role } from "@prisma/client";

export class RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: Role; // opcional o puede venir por defecto
}