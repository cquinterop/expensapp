import { IsEmail, IsNotEmpty, IsString, MinLength, IsUUID } from 'class-validator';

export class LoginDto {
	@IsNotEmpty()
	@IsEmail({}, { message: 'Invalid email format' })
	email!: string;

	@IsNotEmpty()
	@IsString({ message: 'Password must be a string' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password!: string;
}
