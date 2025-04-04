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
import { User } from '@/domain/entities/user.entity';

@injectable()
export class ExpenseController {
	constructor(@inject(TYPES.ExpenseService) private readonly expenseService: ExpenseService) {}

	async createExpense(req: Request, res: Response, next: NextFunction) {
		try {
			const { expenseType } = req.body;
			const { tenantId, id: userId } = req.user as User;

			const expenseHandlers = {
				[ExpenseType.REGULAR]: async () => {
					const regularExpenseDto = plainToClass(CreateRegularExpenseDto, req.body);
					const errors = await validate(regularExpenseDto);
					if (errors.length) {
						throw new ValidationError('Invalid regular expense data', errors);
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
					if (errors.length) {
						throw new ValidationError('Invalid travel expense data', errors);
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
					if (errors.length) {
						throw new ValidationError('Invalid mileage expense data', errors);
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

			const expenseHandler = expenseHandlers?.[expenseType as ExpenseType];

			if (!expenseHandler) {
				throw new ValidationError('Invalid expense type');
			}

			const expense = await expenseHandler();

			res.status(201).json(expense);
		} catch (error) {
			next(error);
		}
	}

	async getExpenses(req: Request, res: Response, next: NextFunction) {
		try {
			const filterDto = plainToClass(ExpenseFilterDto, req.query);
			const errors = await validate(filterDto);
			if (errors.length) {
				throw new ValidationError('Invalid expense filter data', errors);
			}
			const { tenantId } = req.user as User;

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

	async getExpenseById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { tenantId } = req.user as User;

			const expense = await this.expenseService.getExpenseById(id);

			if (expense.tenantId !== tenantId) {
				res.status(403).json({ error: 'You do not have permission to view this expense' });
				return;
			}

			res.status(200).json(expense);
		} catch (error) {
			next(error);
		}
	}

	async updateExpense(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { tenantId } = req.user as User;
			const expense = await this.expenseService.getExpenseById(id);

			if (expense.tenantId !== tenantId) {
				throw new ValidationError('You do not have permission to update this expense');
			}

			if (expense.status !== ExpenseStatus.PENDING) {
				throw new ValidationError('Only pending expenses can be updated');
			}

			const updatedExpense = await this.expenseService.updateExpense(id, req.body);

			res.status(200).json(updatedExpense);
		} catch (error) {
			next(error);
		}
	}

	async deleteExpense(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const expense = await this.expenseService.getExpenseById(id);
			const { tenantId } = req.user as User;

			if (expense.tenantId !== tenantId) {
				throw new ValidationError('You do not have permission to delete this expense');
			}

			if (expense.status !== ExpenseStatus.PENDING) {
				throw new ValidationError('Only pending expenses can be deleted');
			}

			await this.expenseService.deleteExpense(id);

			res.status(204).send();
		} catch (error) {
			next(error);
		}
	}

	async approveExpense(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { id: adminId, isAdmin } = req.user as User;

			if (!isAdmin) {
				throw new ValidationError('You do not have permission approve this expense');
			}

			const expense = await this.expenseService.approveExpense(id, adminId);

			res.status(200).json(expense);
		} catch (error) {
			next(error);
		}
	}

	async rejectExpense(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { id: adminId, isAdmin } = req.user as User;

			if (!isAdmin) {
				throw new ValidationError('You do not have permission reject this expense');
			}

			const expense = await this.expenseService.rejectExpense(id, adminId);

			res.status(200).json(expense);
		} catch (error) {
			next(error);
		}
	}
}
