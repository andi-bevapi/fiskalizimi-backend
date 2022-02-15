const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
const Joivalidation = require("../validation/category");
/**
 * @swagger
 * tags:
 *  name: Category
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *     type: object
 *     properties:
 *      name:
 *        type: string
 *      isActive :
 *        type: boolean
 *      isDeleted:
 *        type: boolean
 */


// @route   GET api/categories
// @desc    Get all categories
// @access  Private
/**
 * @swagger
 * /api/categories:
 *  get:
 *    summary: Get all categories
 *    tags: [Category]
 *    responses:
 *      200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Category'
 */
router.get("/", categoryController.getAllCategory);

// @route   POST api/categories/create
// @desc    Create new category
// @access  Private
/**
 *@swagger
 * /api/categories/create:
 *   post:
 *       summary: Create new categories
 *       tags: [Category]
 *       description: Create a new category
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Category'
 *       responses:
 *           "200":
 *             description: Success
 *           "409":
 *              description: category with this name exists
 *           "500":
 *              description: internal server error
 */
router.post("/create",Joivalidation,categoryController.createCategory);

// @route   UPDATE api/categories/update/{id}
// @desc    update one categories
// @access  Private
/**
 * @swagger
 * /api/categories/update/{id}:
 *  put:
 *    summary: Get all categories
 *    tags: [Category]
 *    description: Create a new category
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: category id
 *        required: true
 *    requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *      500:
 *        description: internal server error
 */

router.put("/update/:id",Joivalidation,categoryController.updateCategory);

// @route   DELETE api/categories/delete/{id}
// @desc    delete one categories
// @access  Private
/**
 * @swagger
 * /api/categories/delete/{id}:
 *  put:
 *    summary: Delete one category
 *    tags: [Category]
 *    description: Delete category
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: category id
 *        required: true
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *      500:
 *        description: internal server error
 */
router.put("/delete/:id", categoryController.deleteCategory);

module.exports = router;
