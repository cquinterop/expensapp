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
	@IsString({ message: 'First name must be a string' })
	@MinLength(1, { message: 'First name is required' })
	firstName!: string;

	@IsNotEmpty()
	@IsString({ message: 'Last name must be a string' })
	@MinLength(1, { message: 'Last name is required' })
	lastName!: string;
}
