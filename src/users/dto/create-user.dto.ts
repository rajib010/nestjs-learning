import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['Intern', 'Engineer', 'Admin'], {
    message: 'Valid role is required.',
  })
  role: 'Intern' | 'Engineer' | 'Admin';
}
