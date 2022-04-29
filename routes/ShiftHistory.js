const express = require("express");
const router = express.Router();
const ShiftHistoryController = require("../controllers/ShiftHistoryController");

/**
 * @swagger
 * tags:
 *  name: ShiftHistory
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ShiftHistory:
 *     type: object
 *     properties:
 *      shiftStart:
 *        type: string
 *      shiftEnd:
 *        type: string
 *      userId:
 *        type: string
 *      arkaId:
 *        type: string
 */

// @route   GET api/shift-history/:userId
// @desc    Get all shiftHistory
// @access  Private
/**
 * @swagger
 * /api/shift-history/{userId}:
 *  get:
 *    summary: Get today's user shift history
 *    tags: [ShiftHistory]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *        description: userId
 *        required: true
 *    responses:
 *      200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/ShiftHistory'
 */
router.get("/:userId", ShiftHistoryController.getTodayShift);

// @route   UPDATE api/shift-history/update/{userId}
// @desc    update one shift-history
// @access  Private
/**
 * @swagger
 * /api/shift-history/update/{userId}:
 *  put:
 *    summary: Update shift
 *    tags: [ShiftHistory]
 *    description: Update shift history
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *        description: user id
 *        required: true
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/ShiftHistory'
 *      500:
 *        description: internal server error
 */

router.put("/update/:userId", ShiftHistoryController.updateShift);

module.exports = router;
