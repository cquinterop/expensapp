import { Router } from 'express';
import { container } from '@/infrastructure/config/inversify.config';
import { TYPES } from '@/infrastructure/config/types';
import type { UserController } from '@/interfaces/controllers/user.controller';
import { authenticate } from '@/interfaces/middlewares/auth.middleware';

const router = Router();
const userController = container.get<UserController>(TYPES.UserController);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List users within a tenant
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, (req, res) => userController.getUsersByTenantId(req, res));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: View user details
 *     tags: [Users]
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
 *         description: User details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Access denied
 *       404:
 *         description: User not found
 */
router.get('/:id', authenticate, (req, res) => userController.getUserById(req, res));

export default router;
