const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  validateUser,
  validateUserLogin,
  validateUserUpdate,
} = require("../validation/user");

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
 *      user:
 *       type: object
 *       properties:
 *        username:
 *           type: string
 *        operatorCode:
 *           type: string
 *        email:
 *           type: string
 *        password:
 *           type: string
 *        passwordNew:
 *           type: string
 *        isFirstTimeLogin:
 *           type: boolean
 *        position:
 *           type: string
 *        phone:
 *           type: string
 *        firstName:
 *           type: string
 *        lastName:
 *           type: string
 *        clientId:
 *           type: number
 *        branchId:
 *           type: number
 *        isActive:
 *           type: boolean
 *        isDeleted:
 *           type: boolean
 *       createdAt:
 *          type: string
 *       updatedAt:
 *          type: string
 *      permissions:
 *          type: array
 *          items:
 *              type: integer
 */

// @route   GET api/user/:branchId
// @desc    Get all users
// @access  Private
/**
 * @swagger
 * /api/user/{branchId}:
 *   get:
 *       summary: Get users
 *       tags: [User]
 *       description: Get users based on branch
 *       parameters:
 *         - in: path
 *           name: branchId
 *           schema:
 *             type: number
 *           description: Branch id
 *           required: true
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
router.get("/:branchId", userController.getAllUsers);

// @route   GET api/user/clientId/:clientId
// @desc    Get all users
// @access  Private
/**
 * @swagger
 * /api/user/clientId/{clientId}:
 *   get:
 *       summary: Get users
 *       tags: [User]
 *       description: Get users based on branch
 *       parameters:
 *         - in: path
 *           name: clientId
 *           schema:
 *             type: number
 *           description: Client id
 *           required: true
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
router.get("/clientId/:clientId", userController.getAllUsersByClientId);

// @route   GET api/user/current/info
// @desc    Get user
// @access  Private
/**
 * @swagger
 * /api/user/current/info:
 *   get:
 *       security:
 *          - bearerAuth: []
 *       summary: Get user
 *       tags: [User]
 *       description: Get user
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
router.get("/current/info", userController.getCurrentUser);

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

router.post("/create", validateUser, userController.createUser);

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

router.put("/update/:id", validateUserUpdate, userController.updateUser);

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

// @route   POST api/user/login
// @desc    Login user
// @access  Public
/**
 *@swagger
 * /api/user/login:
 *   post:
 *       summary: Login user
 *       tags: [User]
 *       description: Login user
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    type: object
 *                    properties:
 *                      username:
 *                          type: string
 *                      password:
 *                          type: string
 *       responses:
 *           "200":
 *             description: Success
 *           "409":
 *              description: Conflict, a user already exists
 *           "500":
 *              description: Internal server error
 */
router.post("/login", validateUserLogin, userController.loginUser);

module.exports = router;
