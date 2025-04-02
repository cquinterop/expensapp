import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import sequelize from '@/infrastructure/database/config/database';
import { TenantModel } from '@/infrastructure/database/models/tenant.model';
import { UserModel } from '@/infrastructure/database/models/user.model';
import { ExpenseModel } from '@/infrastructure/database/models/expense.model';
import { RegularExpenseModel } from '@/infrastructure/database/models/regular-expense.model';
import { TravelExpenseModel } from '@/infrastructure/database/models/travel-expense.model';
import { AccommodationDetailModel } from '@/infrastructure/database/models/accommodation-detail.model';
import { TransportationDetailModel } from '@/infrastructure/database/models/transportation-detail.model';
import { MileageExpenseModel } from '@/infrastructure/database/models/mileage-expense.model';
import { MileageRateModel } from '@/infrastructure/database/models/mileage-rate.model';
import logger from '@/infrastructure/logger';

async function seed() {
	try {
		// Sync database models
		await sequelize.sync({ force: true });
		logger.info('Database synchronized');

		// Create tenants
		const tenant1Id = uuidv4();
		const tenant2Id = uuidv4();

		await TenantModel.bulkCreate([
			{
				id: tenant1Id,
				name: 'Acme Inc.',
				balance: 10000,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: tenant2Id,
				name: 'Globex Corp',
				balance: 15000,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
		logger.info('Tenants created');

		// Create users
		const adminPasswordHash = await bcrypt.hash('admin123', 10);
		const employeePasswordHash = await bcrypt.hash('employee123', 10);

		const admin1Id = uuidv4();
		const admin2Id = uuidv4();
		const employee1Id = uuidv4();
		const employee2Id = uuidv4();

		await UserModel.bulkCreate([
			{
				id: admin1Id,
				tenantId: tenant1Id,
				email: 'admin@acme.com',
				fullName: 'Road Runner',
				passwordHash: adminPasswordHash,
				role: 'admin',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: employee1Id,
				tenantId: tenant1Id,
				email: 'employee@acme.com',
				fullName: 'Wile E. Coyote',
				passwordHash: employeePasswordHash,
				role: 'employee',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: admin2Id,
				tenantId: tenant2Id,
				email: 'admin@globex.com',
				fullName: 'Hank Scorpio',
				passwordHash: adminPasswordHash,
				role: 'admin',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: employee2Id,
				tenantId: tenant2Id,
				email: 'employee@globex.com',
				fullName: 'Homer Simpson',
				passwordHash: employeePasswordHash,
				role: 'employee',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
		logger.info('Users created');

		// Create mileage rates
		await MileageRateModel.bulkCreate([
			{
				id: uuidv4(),
				tenantId: tenant1Id,
				rate: 0.3,
				effectiveDate: new Date(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: uuidv4(),
				tenantId: tenant2Id,
				rate: 0.35,
				effectiveDate: new Date(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
		logger.info('Mileage rates created');

		// Create expenses
		// Regular expense
		const regularExpenseId = uuidv4();
		await ExpenseModel.create({
			id: regularExpenseId,
			tenantId: tenant1Id,
			userId: employee1Id,
			amount: 125.5,
			description: 'Office supplies',
			expenseType: 'regular',
			status: 'pending',
			submittedAt: new Date(),
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await RegularExpenseModel.create({
			id: uuidv4(),
			expenseId: regularExpenseId,
			receiptUrl: 'https://example.com/receipt1.jpg',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// Travel expense - Accommodation
		const travelExpenseId = uuidv4();
		await ExpenseModel.create({
			id: travelExpenseId,
			tenantId: tenant1Id,
			userId: employee1Id,
			amount: 450.0,
			description: 'Business trip to New York',
			expenseType: 'travel',
			status: 'pending',
			submittedAt: new Date(Date.now() - 86400000), // 1 day ago
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const travelExpenseDetailId = uuidv4();
		await TravelExpenseModel.create({
			id: travelExpenseDetailId,
			expenseId: travelExpenseId,
			travelSubtype: 'accommodation',
			startDate: new Date(Date.now() - 86400000 * 3), // 3 days ago
			endDate: new Date(Date.now() - 86400000), // 1 day ago
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await AccommodationDetailModel.create({
			id: uuidv4(),
			travelExpenseId: travelExpenseDetailId,
			hotelName: 'Hilton New York',
			checkInDate: new Date(Date.now() - 86400000 * 3), // 3 days ago
			checkOutDate: new Date(Date.now() - 86400000), // 1 day ago
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// Travel expense - Transportation
		const transportExpenseId = uuidv4();
		await ExpenseModel.create({
			id: transportExpenseId,
			tenantId: tenant1Id,
			userId: employee1Id,
			amount: 350.0,
			description: 'Flight to Chicago',
			expenseType: 'travel',
			status: 'approved',
			submittedAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
			processedAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
			processedBy: admin1Id,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const transportExpenseDetailId = uuidv4();
		await TravelExpenseModel.create({
			id: transportExpenseDetailId,
			expenseId: transportExpenseId,
			travelSubtype: 'transportation',
			startDate: new Date(Date.now() - 86400000 * 7), // 7 days ago
			endDate: new Date(Date.now() - 86400000 * 6), // 6 days ago
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await TransportationDetailModel.create({
			id: uuidv4(),
			travelExpenseId: transportExpenseDetailId,
			transportationMode: 'Flight',
			route: 'New York to Chicago',
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// Mileage expense
		const mileageExpenseId = uuidv4();
		await ExpenseModel.create({
			id: mileageExpenseId,
			tenantId: tenant1Id,
			userId: employee1Id,
			amount: 45.0,
			description: 'Client visit',
			expenseType: 'mileage',
			status: 'rejected',
			submittedAt: new Date(Date.now() - 86400000 * 10), // 10 days ago
			processedAt: new Date(Date.now() - 86400000 * 8), // 8 days ago
			processedBy: admin1Id,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await MileageExpenseModel.create({
			id: uuidv4(),
			expenseId: mileageExpenseId,
			distanceKm: 150,
			ratePerKm: 0.3,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		logger.info('Expenses created');

		logger.info('Database seeded successfully');
	} catch (error) {
		logger.error(`Error seeding database: ${error}`);
	} finally {
		await sequelize.close();
	}
}

seed();
