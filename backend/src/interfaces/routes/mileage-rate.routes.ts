import { Router } from 'express';
import { container } from '@/infrastructure/config/inversify.config';
import { TYPES } from '@/infrastructure/config/types';
import type { MileageRateController } from '@/interfaces/controllers/mileage-rate.controller';
import { authenticate, authorizeAdmin } from '@/interfaces/middlewares/auth.middleware';

const router = Router();
const mileageRateController = container.get<MileageRateController>(TYPES.MileageRateController);

/**
 * @swagger
 * /mileage-rate:
 *   get:
 *     summary: Get the current mileage reimbursement rate
 *     tags: [Mileage Rate]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current mileage rate
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, (req, res) => mileageRateController.getCurrentMileageRate(req, res));

/**
 * @swagger
 * /mileage-rate:
 *   put:
 *     summary: Update mileage rate
 *     tags: [Mileage Rate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rate
 *             properties:
 *               rate:
 *                 type: number
 *                 minimum: 0.01
 *     responses:
 *       200:
 *         description: Mileage rate updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.put('/', authenticate, authorizeAdmin, (req, res) =>
	mileageRateController.updateMileageRate(req, res),
);

export default router;
