import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
	@IsNotEmpty()
	@IsString({ message: 'Tenant name must be a string' })
	@MinLength(2, { message: 'Tenant name must be at least 2 characters long' })
	tenantName!: string;

	@IsNotEmpty()
	@IsEmail({}, { message: 'Invalid email format' })
	email!: string;

	@IsNotEmpty()
	@IsString({ message: 'Password must be a string' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password!: string;

	@IsNotEmpty()
	@IsString({ message: 'Full name must be a string' })
	@MinLength(1, { message: 'Full name is required' })
	fullName!: string;
}
