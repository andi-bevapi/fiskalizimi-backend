const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *  name: Product
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *     type: object
 *     properties:
 *       name:
 *          type: string
 *       description:
 *          type: string
 *       price:
 *          type: number
 *       barcode:
 *          type: string
 *       supplierId:
 *          type: number
 *       stock:
 *          type: string
 *       stockCheck:
 *          type: boolean
 *       imageVirtualPath:
 *          type: string
 *       branchId:
 *          type: number
 *       sellingUnitId:
 *          type: number
 *       categoryId:
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

// @route   GET api/product
// @desc    Get all products
// @access  Private
/**
 * @swagger
 * /api/product:
 *  get:
 *    summary: Get all products
 *    tags: [Product]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get('/', productController.getProducts);

module.exports = router;