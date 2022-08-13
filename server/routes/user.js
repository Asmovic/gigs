import express from 'express';
import AuthController from '../controllers/authController';
import Validator from '../middlewares/validators';
import Handler from '../middlewares/handleValidation';

const router = express.Router();

/**
 * definitions:
 *   User:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   Response:
 *     properties:
 *       code:
 *         type: int
 *       data:
 *         type: object
 *       message:
 *         type: string
 *       status:
 *         type: boolean
 *
 */

/**
 * /api/v1/users:
 *   post:
 *     tags:
 *       - register
 *     description: Register a new user account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User's email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post(
  '/signup',
  Validator.validateRegistration(),
  Handler.handleRegistration,
  AuthController.register,
);

export default router;
