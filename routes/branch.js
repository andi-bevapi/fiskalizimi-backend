const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

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

module.exports = router;