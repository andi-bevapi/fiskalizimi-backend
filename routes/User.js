const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const Joivalidation = require("../validation/user");

/**
 * @swagger
 * tags:
 *  name: User
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *     type: object
 *     properties:
 *       username:
 *          type: string
 *       operatorCode:
 *          type: string
 *       email:
 *          type: string
 *       password:
 *          type: string
 *       isFirstTimeLogin:
 *          type: boolean
 *       position:
 *          type: string
 *       phone:
 *          type: string
 *       firstName:
 *          type: string
 *       lastName:
 *          type: string
 *       branchId:
 *          type: number
 *       clientId:
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

// @route   GET api/user
// @desc    Get all users
// @access  Private
/**
 * @swagger
 * /api/user:
 *  get:
 *    summary: Get all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

router.get("/", userController.getAllUsers);

// @route   POST api/user/create
// @desc    Create new user
// @access  Private
/**
 *@swagger
 * /api/user/create:
 *   post:
 *       summary: Create new user
 *       tags: [User]
 *       description: Create a new user
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/User'
 *       responses:
 *           "200":
 *             description: Success
 *           "409":
 *              description: Conflict, a user already exists
 *           "500":
 *              description: Internal server error
 */

router.post("/create", Joivalidation, userController.createUser);

// @route   PUT api/user/update/{id}
// @desc    Update one user
// @access  Private
/**
 *@swagger
 * /api/user/update/{id}:
 *   put:
 *       summary: Update user
 *       tags: [User]
 *       description: Update a user
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *           description: user id
 *           required: true
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/User'
 *       responses:
 *           "200":
 *             description: Success
 *           "404":
 *              description: Not found, User not found
 *           "409":
 *              description: Conflict, User already exists
 *           "500":
 *              description: Internal server error
 */

router.put("/update/:id", Joivalidation, userController.updateUser);

// @route   PUT api/user/delete/{id}
// @desc    Delete one user
// @access  Private
/**
 *@swagger
 * /api/user/delete/{id}:
 *   put:
 *       summary: Delete user
 *       tags: [User]
 *       description: Delete a user
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: number
 *           description: user id
 *           required: true
 *       responses:
 *           "200":
 *             description: Success
 *           "404":
 *              description: User not found
 *           "500":
 *              description: Internal server error
 */

router.put("/delete/:id", userController.deleteUser);

module.exports = router;
