import { Router } from 'express';
import { container } from '@/infrastructure/config/inversify.config';
import { TYPES } from '@/infrastructure/config/types';
import type { UserController } from '@/interfaces/controllers/user.controller';
import { authenticate, authorizeAdmin } from '@/interfaces/middlewares/auth.middleware';

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
router.get('/', authenticate, userController.getUsersByTenantId.bind(userController));

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
router.get('/:id', authenticate, userController.getUserById.bind(userController));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user role/status
 *     tags: [Users]
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
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, employee, super_admin]
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.put('/:id', authenticate, userController.updateUser.bind(userController));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove a user
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
 *       204:
 *         description: User removed successfully
 *       400:
 *         description: Invalid operation
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.delete('/:id', authenticate, authorizeAdmin, userController.deleteUser.bind(userController));

export default router;
