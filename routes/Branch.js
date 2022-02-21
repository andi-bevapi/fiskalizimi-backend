const express = require('express');
const router = express.Router();
const branchController = require('../controllers/BranchController');
const Joivalidation = require("../validation/branch");
/**
 * @swagger
 * tags:
 *  name: Branch
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Branch:
 *     type: object
 *     properties:
 *       name:
 *          type: string
 *       address:
 *          type: string
 *       city:
 *          type: string
 *       clientId:
 *          type: number
 *       businessUnitCode:
 *          type: string
 *       maintainerCode:
 *          type: string
 *       code:
 *          type: string
 *       isActive:
 *          type: boolean
 *       isDeleted:
 *          type: boolean
 *       createdAt:
 *          type: string
 *       updatedAt:
 *          type: string
 */

// @route   GET api/branch
// @desc    Get all branches
// @access  Private
/**
 * @swagger
 * /api/branch:
 *  get:
 *    summary: Get all branches
 *    tags: [Branch]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Branch'
 */
router.get('/', branchController.getBranches);


// @route   POST api/branch/create
// @desc    Create new branch
// @access  Private
/**
 *@swagger
 * /api/branch/create:
 *   post:
 *       summary: Create new branch
 *       tags: [Branch]
 *       description: Create a new category
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Branch'
 *       responses:
 *           "200":
 *             description: Success
 *           "500":
 *              description: internal server error
 */
 router.post("/create",Joivalidation,branchController.createBranch);



// @route   UPDATE api/branch/update/{id}
//  @desc     update one branches
//  @access  Private
/**
 * @swagger
 * /api/branch/update/{id}:
 *  put:
 *    summary: Update branch
 *    tags: [Branch]
 *    description: Create a new branch
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: branch id
 *        required: true
 *    requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Branch'
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/Branch'
 *      500:
 *        description: internal server error
 */

router.put("/update/:id",Joivalidation,branchController.updateBranch);


//  @route      Delete api/branch/delete/{id}
//  @desc       delete one branches
//  @access     Private
/**
 * @swagger
 * /api/branch/delete/{id}:
 *  put:
 *    summary: Delete branch
 *    tags: [Branch]
 *    description: Delete a new branch
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: branch id
 *        required: true
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/Branch'
 *      500:
 *        description: internal server error
 */

 router.put("/delete/:id",branchController.deleteBranch);

module.exports = router;