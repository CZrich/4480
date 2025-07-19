import { Role, User } from "@prisma/client";

export class UserDetailDto {
  id: string;
  name: string;
  email: string;
  role?: Role; // Assuming role is a string, adjust if it's an enum or different type
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  // You can add methods or additional properties if needed
  // For example, to convert to a plain object or to JSON               
}