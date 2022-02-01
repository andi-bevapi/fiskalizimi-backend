const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

/**
 * @swagger
 * tags:
 *  name: Client
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Client:
 *     type: object
 *     properties:
 *       name:
 *          type: string
 *       address:
 *          type: string
 *       NUIS:
 *          type: string
 *       logoVirtualPath:
 *          type: string
 *       hasVat:
 *          type: boolean
 *       vat:
 *          type: string
 *       email:
 *          type: string
 *       numberOfUsers:
 *          type: number
 *       phoneNumber:
 *          type: string
 *       TCRCode:
 *          type: string
 *       softCode:
 *          type: string
 *       signature:
 *          type: string
 *       certificate:
 *          type: string
 *       typeOfTCR:
 *          type: string
 *       validFrom:
 *          type: string
 *       validTo:
 *          type: string
 *       isActive:
 *          type: boolean
 *       isDeleted:
 *          type: boolean
 *       createdAt:
 *          type: string
 *       updatedAt:
 *          type: string
 */

// @route   GET api/client
// @desc    Get all clients
// @access  Private
/**
 * @swagger
 * /api/client:
 *  get:
 *    summary: Get all clients
 *    tags: [Client]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Client'
 */
router.get('/', clientController.getClients);

module.exports = router;