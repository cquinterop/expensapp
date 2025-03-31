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
 * /auth/login:
 *   post:
 *     summary: Login to the system
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
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', apiLimiter, authController.login.bind(authController));

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
 *               - firstName
 *               - lastName
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
router.post('/signup', (req, res) => authController.signup(req, res));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout from the system
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', (req, res) => authController.logout(req, res));

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
router.get('/me', authenticate, (req, res) => authController.getCurrentUser(req, res));

export default router;
