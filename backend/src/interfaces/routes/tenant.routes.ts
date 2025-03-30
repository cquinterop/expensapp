import { Router } from 'express';
import { container } from '@/infrastructure/config/inversify.config';
import { TYPES } from '@/infrastructure/config/types';
import type { TenantController } from '@/interfaces/controllers/tenant.controller';
import { authenticate, authorizeAdmin } from '@/interfaces/middlewares/auth.middleware';

const router = Router();
const tenantController = container.get<TenantController>(TYPES.TenantController);

/**
 * @swagger
 * /tenants:
 *   get:
 *     summary: List all tenants
 *     tags: [Tenants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tenants
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Super admin access required
 */
router.get('/', authenticate, (req, res) => tenantController.getAllTenants(req, res));

/**
 * @swagger
 * /tenants/{id}:
 *   get:
 *     summary: Get tenant details
 *     tags: [Tenants]
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
 *         description: Tenant details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Access denied
 *       404:
 *         description: Tenant not found
 */
router.get('/:id', authenticate, (req, res) => tenantController.getTenantById(req, res));

/**
 * @swagger
 * /tenants/{id}:
 *   put:
 *     summary: Update tenant details
 *     tags: [Tenants]
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
 *               name:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tenant updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Tenant not found
 */
router.put('/:id', authenticate, authorizeAdmin, (req, res) =>
	tenantController.updateTenant(req, res),
);

/**
 * @swagger
 * /tenants/{id}:
 *   delete:
 *     summary: Delete a tenant
 *     tags: [Tenants]
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
 *         description: Tenant deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Super admin access required
 *       404:
 *         description: Tenant not found
 */
router.delete('/:id', authenticate, (req, res) => tenantController.deleteTenant(req, res));

export default router;
