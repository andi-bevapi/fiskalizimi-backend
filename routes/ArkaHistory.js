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
 *      arkaId:
 *        type: number
 *      userId:
 *        type: number
 */

// @route   GET api/arka-history/:arkaId
// @desc    Get all arkaHistory
// @access  Private
/**
 * @swagger
 * /api/arka-history/{arkaId}:
 *  get:
 *    summary: Get all arka history
 *    tags: [ArkaHistory]
 *    parameters:
 *      - in: path
 *        name: arkaId
 *        schema:
 *          type: number
 *        description: arkaId
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
 *                    $ref: '#/components/schemas/ArkaHistory'
 *       responses:
 *           "200":
 *             description: Success
 *           "500":
 *              description: internal server error
 */
router.post("/create", arkaHistoryController.updateAmount);

// @route   GET api/arka-history/todays/:arkaId
// @desc    Get all arkaHistory
// @access  Private
/**
 * @swagger
 * /api/arka-history/todays/{arkaId}:
 *  get:
 *    summary: Get todays arka history
 *    tags: [ArkaHistory]
 *    parameters:
 *      - in: path
 *        name: arkaId
 *        schema:
 *          type: number
 *        description: arkaId
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
router.get("/todays/:arkaId", arkaHistoryController.getArkaHistory);

router.get("/:arkaId", arkaHistoryController.getLastAmount);


// @route   POST api/arka-history/autoInsert
// @desc    Check if new depozit exist
// @access  Private
/**
 *@swagger
 * /api/arka-history/autoInsert:
 *   post:
 *       summary: Check if new depozit exist
 *       tags: [ArkaHistory]
 *       description:  Check if new depozit exist
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/ArkaHistory'
 *       responses:
 *           "200":
 *             description: Success
 *           "500":
 *              description: internal server error
 */
router.post("/autoInsert", arkaHistoryController.autoInsertDeclaration);

module.exports = router;