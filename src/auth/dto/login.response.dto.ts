import { Role } from "generated/prisma";

export class LoginResponseDto {
    jwt: string;
    id: string;
    name: string;
    email: string;
    role?: Role; // Asumiendo que el rol es un string, ajustar si es un enum o tipo diferente
  

  constructor(partial: Partial<LoginResponseDto>) {
    Object.assign(this, partial);
  }



}