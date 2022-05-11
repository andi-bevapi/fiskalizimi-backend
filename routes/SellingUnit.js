const express = require("express");
const router = express.Router();
const sellingUnitController = require("../controllers/SellingUnitController");
const Joivalidation = require("../validation/sellingUnit");
/**
 * @swagger
 * tags:
 *  name: SellingUnits
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    SellingUnits:
 *     type: object
 *     properties:
 *      name:
 *        type: string
 *      isActive :
 *        type: boolean
 *      isDeleted:
 *        type: boolean
 */


// @route   GET api/selling-units/:branchId
// @desc    Get all selling-units
// @access  Private
/**
 * @swagger
 * /api/selling-units/{branchId}:
 *  get:
 *    summary: Get all selling unit
 *    tags: [SellingUnits]
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
 *               $ref: '#/components/schemas/SellingUnits'
 */
router.get("/:branchId", sellingUnitController.getAllSellingUnit);

// @route   GET api/selling-units/clientId/:clientId
// @desc    Get all selling-units
// @access  Private
/**
 * @swagger
 * /api/selling-units/clientId/{clientId}:
 *  get:
 *    summary: Get all selling unit
 *    tags: [SellingUnits]
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
 *               $ref: '#/components/schemas/SellingUnits'
 */
 router.get("/clientId/:clientId", sellingUnitController.getAllSellingUnitByClientId);

// @route   POST api/selling-units/create
// @desc    Create new selling unit
// @access  Private
/**
 *@swagger
 * /api/selling-units/create:
 *   post:
 *       summary: Create new selling unit
 *       tags: [SellingUnits]
 *       description: Create a new selling unit
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/SellingUnits'
 *       responses:
 *           "200":
 *             description: Success
 *           "409":
 *              description: selling unit with this name exists
 *           "500":
 *              description: internal server error
 */
router.post("/create",Joivalidation ,sellingUnitController.createSellingUnit);

// @route   UPDATE api/selling-units/update/{id}
// @desc    update one selling-units
// @access  Private
/**
 * @swagger
 * /api/selling-units/update/{id}:
 *  put:
 *    summary: Get all selling unit
 *    tags: [SellingUnits]
 *    description: Create a selling unit
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: selling unit id
 *        required: true
 *    requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SellingUnits'
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/SellingUnits'
 *      500:
 *        description: internal server error
 */

router.put("/update/:id",Joivalidation ,sellingUnitController.updatedSellingUnit);

// @route   DELETE api/selling-units/delete/{id}
// @desc    delete one selling-units
// @access  Private
/**
 * @swagger
 * /api/selling-units/delete/{id}:
 *  put:
 *    summary: Delete one selling-units
 *    tags: [SellingUnits]
 *    description: Delete selling-units
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: selling-units id
 *        required: true
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/SellingUnits'
 *      500:
 *        description: internal server error
 */
router.put("/delete/:id", sellingUnitController.deleteSellingUnit);

module.exports = router;
