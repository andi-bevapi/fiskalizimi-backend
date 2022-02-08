const express = require('express');
const router = express.Router();
const transportOrderController = require('../controllers/TransportOrderController');

/**
 * @swagger
 * tags:
 *  name: TransportOrder
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    TransportOrder:
 *     type: object
 *     properties:
 *       clientId:
 *          type: number
 *       branchId:
 *          type: number
 *       type:
 *          type: string
 *       transportTransaction:
 *          type: string
 *       transportDateTime:
 *          type: string
 *       totalValue:
 *          type: number
 *       packNumber:
 *          type: number
 *       WTNIC:
 *          type: string
 *       isActive:
 *          type: boolean
 *       isDeleted:
 *          type: boolean
 *       createdAt:
 *          type: string
 *       updatedAt:
 *          type: string
 *    TransportOrderDetails:
 *     type: object
 *     properties:
 *       transportOrderId:
 *          type: number
 *       startAddress:
 *          type: string
 *       startCity:
 *          type: string
 *       startPoint:
 *          type: string
 *       startDateTime:
 *          type: string
 *       destinationAddress:
 *          type: string
 *       destinationCity:
 *          type: string
 *       destinationPoint:
 *          type: string
 *       destinationDateTime:
 *          type: string
 *       vehiclePlates:
 *          type: string
 *       carrierName:
 *          type: string
 *       carrierAddress:
 *          type: string
 *       isActive:
 *          type: boolean
 *       isDeleted:
 *          type: boolean
 *       createdAt:
 *          type: string
 *       updatedAt:
 *          type: string
 *    TransportOrderItems:
 *     type: object
 *     properties:
 *       transportOrderId:
 *          type: number
 *       branchId:
 *          type: number
 *       productId:
 *          type: number
 *       sellingUnitId:
 *          type: number
 *       description:
 *          type: string
 *       quantity:
 *          type: number
 *       isActive:
 *          type: boolean
 *       isDeleted:
 *          type: boolean
 *       createdAt:
 *          type: string
 *       updatedAt:
 *          type: string
 */

// @route   GET api/transport-order
// @desc    Get all transport orders
// @access  Private
/**
 * @swagger
 * /api/transport-order:
 *  get:
 *    summary: Get all transport orders
 *    tags: [TransportOrder]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TransportOrder'
 */
router.get('/', transportOrderController.getTransportOrders);

// @route   GET api/transport-order/details/:id
// @desc    Get details of a transport order
// @access  Private
/**
 * @swagger
 * /api/transport-order/details/{id}:
 *  get:
 *    summary: Get details of a transport order
 *    tags: [TransportOrder]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The transport order id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TransportOrderDetails'
 */
router.get('/details/:id', transportOrderController.getTransportOrderDetails);

// @route   GET api/transport-order/items/:id
// @desc    Get items of a transport order
// @access  Private
/**
 * @swagger
 * /api/transport-order/items/{id}:
 *  get:
 *    summary: Get items of a transport order
 *    tags: [TransportOrder]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The transport order id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TransportOrderItems'
 */
router.get('/items/:id', transportOrderController.getTransportOrderItems);

module.exports = router;