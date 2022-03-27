const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/PermissionController");
/**
 * @swagger
 * tags:
 *  name: Permission
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Permission:
 *     type: object
 *     properties:
 *      name:
 *        type: string
 *      isActive :
 *        type: boolean
 *      isDeleted:
 *        type: boolean
 */


// @route   GET api/permission
// @desc    Get all permissions
// @access  Private
/**
 * @swagger
 * /api/permission:
 *  get:
 *    summary: Get all permissions
 *    tags: [Permission]
 *    responses:
 *      200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Permission'
 */
router.get("/", permissionController.getAllPermissions);

// @route   POST api/permission
// @desc    Insert permissions
// @access  Private
/**
 *@swagger
 * /api/permission:
 *   post:
 *       summary: Insert permissions
 *       tags: [Permission]
 *       description: Insert permissions
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Permission'
 *       responses:
 *           "200":
 *             description: Success
 *           "500":
 *              description: internal server error
 */
router.post("/", permissionController.createPermissions);

module.exports = router;