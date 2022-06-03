const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/SupplierController");
const Joivalidation = require("../validation/supplier");
/**
 * @swagger
 * tags:
 *  name: Supplier
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Supplier:
 *     type: object
 *     properties:
 *      name:
 *        type: string
 *      branchId:
 *        type: number
 *      clientId:
 *        type: number
 *      isActive:
 *        type: boolean
 *      isDeleted:
 *        type: boolean
 */


// @route   GET api/supplier/:branchId
// @desc    Get all supplier
// @access  Private
/**
 * @swagger
 * /api/supplier/{branchId}:
 *  get:
 *    summary: Get all supplier
 *    tags: [Supplier]
 *    parameters:
 *      - in: path
 *        name: branchId
 *        schema:
 *          type: number
 *        description: branchId
 *        required: true
 *    responses:
 *      200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Supplier'
 */
router.get("/:branchId", supplierController.getAllSupplier);

// @route   GET api/supplier/clientId/:clientId
// @desc    Get all supplier
// @access  Private
/**
 * @swagger
 * /api/supplier/clientId/{clientId}:
 *  get:
 *    summary: Get all supplier
 *    tags: [Supplier]
 *    parameters:
 *      - in: path
 *        name: clientId
 *        schema:
 *          type: number
 *        description: clientId
 *        required: true
 *    responses:
 *      200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Supplier'
 */
 router.get("/clientId/:clientId", supplierController.getAllSupplierByClientId);

// @route   POST api/supplier/create
// @desc    Create new supplier
// @access  Private
/**
 *@swagger
 * /api/supplier/create:
 *   post:
 *       summary: Create new supplier
 *       tags: [Supplier]
 *       description: Create a supplier
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Supplier'
 *       responses:
 *           "200":
 *             description: Success
 *           "409":
 *              description: supplier with this name exists
 *           "500":
 *              description: internal server error
 */
router.post("/create", Joivalidation ,supplierController.createSupplier);

// @route   UPDATE api/supplier/update/{id}
// @desc    update one supplier
// @access  Private
/**
 * @swagger
 * /api/supplier/update/{id}:
 *  put:
 *    summary: Get all supplier
 *    tags: [Supplier]
 *    description: Create supplier
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: supplier id
 *        required: true
 *    requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Supplier'
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/Supplier'
 *      500:
 *        description: internal server error
 */

router.put("/update/:id",Joivalidation,supplierController.updatedSupplier);

// @route   DELETE api/supplier/delete/{id}
// @desc    delete one supplier
// @access  Private
/**
 * @swagger
 * /api/supplier/delete/{id}:
 *  put:
 *    summary: Delete one supplier
 *    tags: [Supplier]
 *    description: Delete supplier
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: supplier id
 *        required: true
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/Supplier'
 *      500:
 *        description: internal server error
 */
router.put("/delete/:id", supplierController.deleteSupplier);

module.exports = router;
