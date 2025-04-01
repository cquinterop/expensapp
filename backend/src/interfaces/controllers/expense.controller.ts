import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { ExpenseService } from '@/domain/services/expense.service';
import { TYPES } from '@/infrastructure/config/types';
import { CreateRegularExpenseDto } from '@/application/dto/expense/regular-expense.dto';
import { CreateTravelExpenseDto } from '@/application/dto/expense/travel-expense.dto';
import { CreateMileageExpenseDto } from '@/application/dto/expense/mileage-expense.dto';
import { ExpenseFilterDto } from '@/application/dto/expense/expense-filter.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ExpenseStatus, ExpenseType } from '@/domain/entities/expense.entity';
import { ValidationError } from '@/domain/errors/app-error';

@injectable()
export class ExpenseController {
	constructor(@inject(TYPES.ExpenseService) private readonly expenseService: ExpenseService) {}

	async createExpense(req: Request, res: Response): Promise<void> {
		try {
			const { expenseType } = req.body;
			const userId = req.user?.id;
			const tenantId = req.user?.tenantId;

			const expenseHandlers = {
				[ExpenseType.REGULAR]: async () => {
					const regularExpenseDto = plainToClass(CreateRegularExpenseDto, req.body);
					const errors = await validate(regularExpenseDto);
					if (errors.length > 0) {
						res.status(400).json({ errors });
						return null;
					}
					return this.expenseService.createRegularExpense({
						tenantId,
						userId,
						description: regularExpenseDto.description,
						amount: regularExpenseDto.amount,
						receiptUrl: regularExpenseDto.receiptUrl,
					});
				},

				[ExpenseType.TRAVEL]: async () => {
					const travelExpenseDto = plainToClass(CreateTravelExpenseDto, req.body);
					const errors = await validate(travelExpenseDto);
					if (errors.length > 0) {
						res.status(400).json({ errors });
						return null;
					}
					return this.expenseService.createTravelExpense({
						tenantId,
						userId,
						description: travelExpenseDto.description,
						amount: travelExpenseDto.amount,
						travelSubtype: travelExpenseDto.travelSubtype,
						startDate: new Date(travelExpenseDto.startDate),
						endDate: new Date(travelExpenseDto.endDate),
						hotelName: travelExpenseDto.hotelName,
						checkInDate: travelExpenseDto.checkInDate
							? new Date(travelExpenseDto.checkInDate)
							: undefined,
						checkOutDate: travelExpenseDto.checkOutDate
							? new Date(travelExpenseDto.checkOutDate)
							: undefined,
						transportationMode: travelExpenseDto.transportationMode,
						route: travelExpenseDto.route,
					});
				},

				[ExpenseType.MILEAGE]: async () => {
					const mileageExpenseDto = plainToClass(CreateMileageExpenseDto, req.body);
					const errors = await validate(mileageExpenseDto);
					if (errors.length > 0) {
						res.status(400).json({ errors });
						return null;
					}
					return this.expenseService.createMileageExpense({
						tenantId,
						userId,
						description: mileageExpenseDto.description,
						distanceKm: mileageExpenseDto.distanceKm,
						ratePerKm: mileageExpenseDto.ratePerKm,
					});
				},
			};

			const expenseHandler = expenseHandlers[expenseType];

			if (!expenseHandler) {
				res.status(400).json({ error: 'Invalid expense type' });
				return;
			}

			const expense = await expenseHandler();

			res.status(201).json(expense);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}

	async getExpenses(req: Request, res: Response, next: NextFunction) {
		try {
			// Validate query parameters
			const filterDto = plainToClass(ExpenseFilterDto, req.query);
			const errors = await validate(filterDto);
			if (errors.length) {
				throw new ValidationError('Invalid expense filter data', errors);
			}

			// Set tenant ID from authenticated user
			const tenantId = req.user?.tenantId;

			// Call service
			const result = await this.expenseService.getExpenses({
				tenantId,
				status: filterDto.status as ExpenseStatus,
				startDate: filterDto.startDate ? new Date(filterDto.startDate) : undefined,
				endDate: filterDto.endDate ? new Date(filterDto.endDate) : undefined,
				page: filterDto.page || 1,
				limit: filterDto.limit || 10,
			});

			res.status(200).json({
				expenses: result.expenses,
				total: result.total,
				page: filterDto.page || 1,
				limit: filterDto.limit || 10,
				totalPages: Math.ceil(result.total / (filterDto.limit || 10)),
			});
		} catch (error) {
			next(error);
		}
	}

	async getExpenseById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const expense = await this.expenseService.getExpenseById(id);

			// Check if expense belongs to user's tenant
			if (expense.tenantId !== req.user?.tenantId) {
				res.status(403).json({ error: 'You do not have permission to view this expense' });
				return;
			}

			res.status(200).json(expense);
		} catch (error) {
			res.status(404).json({ error: (error as Error).message });
		}
	}

	async updateExpense(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const expense = await this.expenseService.getExpenseById(id);

			// Check if expense belongs to user's tenant
			if (expense.tenantId !== req.user?.tenantId) {
				res.status(403).json({ error: 'You do not have permission to update this expense' });
				return;
			}

			// Only allow updates if expense is pending
			if (expense.status !== ExpenseStatus.PENDING) {
				res.status(400).json({ error: 'Only pending expenses can be updated' });
				return;
			}

			// Update expense
			const updatedExpense = await this.expenseService.updateExpense(id, req.body);
			res.status(200).json(updatedExpense);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}

	async deleteExpense(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const expense = await this.expenseService.getExpenseById(id);

			// Check if expense belongs to user's tenant
			if (expense.tenantId !== req.user?.tenantId) {
				res.status(403).json({ error: 'You do not have permission to delete this expense' });
				return;
			}

			// Only allow deletion if expense is pending
			if (expense.status !== ExpenseStatus.PENDING) {
				res.status(400).json({ error: 'Only pending expenses can be deleted' });
				return;
			}

			// Delete expense
			await this.expenseService.deleteExpense(id);
			res.status(204).send();
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}

	async approveExpense(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const adminId = req.user?.id;

			// Check if user is admin
			if (!req.user?.isAdmin) {
				res.status(403).json({ error: 'Only admins can approve expenses' });
				return;
			}

			// Approve expense
			const expense = await this.expenseService.approveExpense(id, adminId);
			res.status(200).json(expense);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}

	async rejectExpense(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const adminId = req.user?.id;

			// Check if user is admin
			if (!req.user?.isAdmin) {
				res.status(403).json({ error: 'Only admins can reject expenses' });
				return;
			}

			// Reject expense
			const expense = await this.expenseService.rejectExpense(id, adminId);
			res.status(200).json(expense);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	}
}
