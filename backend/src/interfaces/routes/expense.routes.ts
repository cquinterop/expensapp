import { Router } from 'express';
import { container } from '@/infrastructure/config/inversify.config';
import { TYPES } from '@/infrastructure/config/types';
import { ExpenseController } from '@/interfaces/controllers/expense.controller';
import { authenticate, authorizeAdmin } from '@/interfaces/middlewares/auth.middleware';

const router = Router();
const expenseController = container.get<ExpenseController>(TYPES.ExpenseController);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Submit a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/CreateRegularExpenseDto'
 *               - $ref: '#/components/schemas/CreateTravelExpenseDto'
 *               - $ref: '#/components/schemas/CreateMileageExpenseDto'
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, (req, res) => expenseController.createExpense(req, res));

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: List all expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       200:
 *         description: List of expenses
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, (req, res) => expenseController.getExpenses(req, res));

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Get details of a specific expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 */
router.get('/:id', authenticate, (req, res) => expenseController.getExpenseById(req, res));

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       400:
 *         description: Invalid input or expense already approved/rejected
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 */
router.put('/:id', authenticate, (req, res) => expenseController.updateExpense(req, res));

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Expense deleted successfully
 *       400:
 *         description: Expense already approved/rejected
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 */
router.delete('/:id', authenticate, (req, res) => expenseController.deleteExpense(req, res));

/**
 * @swagger
 * /expenses/{id}/approve:
 *   post:
 *     summary: Approve an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense approved successfully
 *       400:
 *         description: Invalid operation
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Expense not found
 */
router.post('/:id/approve', authenticate, authorizeAdmin, (req, res) =>
	expenseController.approveExpense(req, res),
);

/**
 * @swagger
 * /expenses/{id}/reject:
 *   post:
 *     summary: Reject an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense rejected successfully
 *       400:
 *         description: Invalid operation
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Expense not found
 */
router.post('/:id/reject', authenticate, authorizeAdmin, (req, res) =>
	expenseController.rejectExpense(req, res),
);

export default router;
