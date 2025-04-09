import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninDto {
	@IsNotEmpty()
	@IsEmail({}, { message: 'Invalid email format' })
	email!: string;

	@IsNotEmpty()
	@IsString({ message: 'Password must be a string' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password!: string;
}
