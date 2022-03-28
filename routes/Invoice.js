const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/InvoiceController');

/**
 * @swagger
 * tags:
 *  name: Invoice
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Invoice:
 *     type: object
 *     properties:
 *       clientId:
 *          type: number
 *       branchId:
 *          type: number
 *       invoiceCode:
 *          type: string
 *       totalAmount:
 *          type: number
 *       totalVat:
 *          type: number
 *       discount:
 *          type: string
 *       description:
 *          type: string
 *       paymentMethod:
 *          type: number
 *       hasPayDeadline:
 *          type: boolean
 *       payDeadline:
 *          type: string
 *       isReturn:
 *          type: boolean
 *       dateTime:
 *          type: string
 *       NSLF:
 *          type: string
 *       FIC:
 *          type: string
 *       status:
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

// @route   GET api/invoice/:branchId
// @desc    Get all invoices by branch
// @access  Private
/**
 * @swagger
 * /api/invoice/{branchId}:
 *  get:
 *    summary: Get all invoices by branch
 *    tags: [Invoice]
 *    parameters:
 *      - in: path
 *        name: branchId
 *        schema:
 *          type: number
 *        description: branchId
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Invoice'
 */
router.get('/:branchId', invoiceController.getInvoices);

// @route   GET api/invoice/:id
// @desc    Get invoice by id
// @access  Private
/**
 * @swagger
 * /api/invoice/{id}:
 *  get:
 *    summary: Get invoice by id
 *    tags: [Invoice]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: invoice id
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Invoice'
 */

 router.get('/:id', invoiceController.getSingleInvoice);

// @route   POST api/invoice
// @desc    Create new invoice
// @access  Private
/**
 *@swagger
 * /api/invoice:
 *   post:
 *       summary: Create new invoice
 *       tags: [Invoice]
 *       description: Create new invoice
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Invoice'
 *       responses:
 *           "200":
 *             description: Success
 *           "500":
 *              description: internal server error
 */
 router.post("/", invoiceController.createInvoice);

module.exports = router;