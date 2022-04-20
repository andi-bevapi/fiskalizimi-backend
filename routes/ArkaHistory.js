const express = require("express");
const router = express.Router();
const arkaHistoryController = require("../controllers/ArkaHistoryController");

/**
 * @swagger
 * tags:
 *  name: ArkaHistory
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ArkaHistory:
 *     type: object
 *     properties:
 *      totalAmount:
 *        type: string
 *      serialNumber:
 *        type: string
 *      action:
 *        type: string
 *      actionTime:
 *        type: string
 */


// @route   GET api/arka-history/:branchId
// @desc    Get all arkaHistory
// @access  Private
/**
 * @swagger
 * /api/arka-history/{branchId}:
 *  get:
 *    summary: Get all arka history
 *    tags: [ArkaHistory]
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
 *               $ref: '#/components/schemas/ArkaHistory'
 */
router.get("/:arkaId", arkaHistoryController.getLastAmount);

// @route   POST api/arka-history/create
// @desc    Create new arka histoy record
// @access  Private
/**
 *@swagger
 * /api/arka-history/create:
 *   post:
 *       summary: Create new arka history record
 *       tags: [ArkaHistory]
 *       description: Create a new arka history record
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Arka'
 *       responses:
 *           "200":
 *             description: Success
 *           "500":
 *              description: internal server error
 */
 router.post("/create", arkaHistoryController.updateAmount);

 module.exports = router;