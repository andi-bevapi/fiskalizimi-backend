const express = require("express");
const router = express.Router();
const configurationController = require("../controllers/ConfigurationController");

/**
 * @swagger
 * tags:
 *  name: Configuration
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Configuration:
 *     type: object
 *     properties:
 *      language:
 *        type: string
 *      printer:
 *        type: string
 *      allowSellsWithZero:
 *        type: boolean
 *      branchId:
 *        type: number
 *      isActive :
 *        type: boolean
 *      isDeleted:
 *        type: boolean
 */

// @route   GET api/configuration/:branchId
// @desc    Get all configurations
// @access  Private
/**
 * @swagger
 * /api/configuration/{branchId}:
 *  get:
 *    summary: Get all configurations
 *    tags: [Configuration]
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
 *               $ref: '#/components/schemas/Configuration'
 *  */

router.get("/:branchId", configurationController.getConfigurations);

// @route   POST api/configuration
// @desc    Create new configuration
// @access  Private
/**
 *@swagger
 * /api/configuration:
 *   post:
 *       summary: Create new configuration
 *       tags: [Configuration]
 *       description: Create new configuration
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Configuration'
 *       responses:
 *           "200":
 *             description: Success
 *           "500":
 *              description: internal server error
 */
 router.post("/", configurationController.createConfiguration);


module.exports = router;
