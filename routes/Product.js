const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

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
router.get("/", productController.getProducts);

// @route   POST api/product/create
// @desc    Create new product
// @access  Private
/**
 *@swagger
 * /api/product/create:
 *   post:
 *       summary: Create new product
 *       tags: [Product]
 *       description: Create a new product
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Product'
 *       responses:
 *           "200":
 *             description: Success
 *           "409":
 *              description: Conflict, a product already exists
 *           "500":
 *              description: Internal server error
 */

router.post("/create", productController.createProduct);

// @route   PUT api/product/delete/{id}
// @desc    Delete one product
// @access  Private
/**
 *@swagger
 * /api/product/delete/{id}:
 *   put:
 *       summary: Delete product
 *       tags: [Product]
 *       description: Delete a product
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *           description: product id
 *           required: true
 *       responses:
 *           "200":
 *             description: Success
 *           "404":
 *              description: Product not found
 *           "500":
 *              description: Internal server error
 */

router.put("/delete/:id", productController.deleteProduct);

// @route   PUT api/product/update/{id}
// @desc    Update one product
// @access  Private
/**
 *@swagger
 * /api/product/update/{id}:
 *   put:
 *       summary: Update product
 *       tags: [Product]
 *       description: Update a product
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *           description: product id
 *           required: true
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Product'
 *       responses:
 *           "200":
 *             description: Success
 *           "404":
 *              description: Not found, Product not found
 *           "409":
 *              description: Conflict, Product already exists
 *           "500":
 *              description: Internal server error
 */

router.put("/update/:id", productController.updateProduct);

module.exports = router;
