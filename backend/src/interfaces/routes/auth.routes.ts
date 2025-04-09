import { Router } from 'express';
import { container } from '@/infrastructure/config/inversify.config';
import { TYPES } from '@/infrastructure/config/types';
import type { AuthController } from '@/interfaces/controllers/auth.controller';
import { authenticate } from '@/interfaces/middlewares/auth.middleware';
import { apiLimiter } from '@/interfaces/middlewares/rate-limit.middleware';

const router = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Signin to the system
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - tenantId
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Signin successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/signin', apiLimiter, authController.signin.bind(authController));

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new tenant and admin user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tenantName
 *               - email
 *               - password
 *               - fullName
 *             properties:
 *               tenantName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               fullName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/signup', authController.signup.bind(authController));

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     summary: Signout from the system
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/signout', authController.signout.bind(authController));

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authenticate, authController.getCurrentUser.bind(authController));

export default router;
