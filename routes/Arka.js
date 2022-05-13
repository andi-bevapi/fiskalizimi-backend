const express = require("express");
const router = express.Router();
const arkaController = require("../controllers/ArkaController");

/**
 * @swagger
 * tags:
 *  name: Arka
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Arka:
 *     type: object
 *     properties:
 *      name:
 *        type: string
 *      serialNumber:
 *        type: string
 *      TCRCODE:
 *        type: string
 *      validFrom:
 *        type: string
 *      validTo:
 *        type: string
 *      branchId:
 *        type: number
 */


// @route   GET api/arkat/:branchId
// @desc    Get all arkat
// @access  Private
/**
 * @swagger
 * /api/arkat/{branchId}:
 *  get:
 *    summary: Get all arkat
 *    tags: [Arka]
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
 *               $ref: '#/components/schemas/Arka'
 */
router.get("/:branchId", arkaController.getAllArka);

// @route   POST api/arkat/create
// @desc    Create new arka
// @access  Private
/**
 *@swagger
 * /api/arkat/create:
 *   post:
 *       summary: Create new arka
 *       tags: [Arka]
 *       description: Create a new arka
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Arka'
 *       responses:
 *           "200":
 *             description: Success
 *           "409":
 *              description: arka with this name exists
 *           "500":
 *              description: internal server error
 */
 router.post("/create", arkaController.createArka);

// @route   UPDATE api/arkat/update/{id}
// @desc    update one arkat
// @access  Private
/**
 * @swagger
 * /api/arkat/update/{id}:
 *  put:
 *    summary: Get all arkat
 *    tags: [Arka]
 *    description: Update arka
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: arka id
 *        required: true
 *    requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Arka'
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/Arka'
 *      500:
 *        description: internal server error
 */

router.put("/update/:id", arkaController.updateArka);

// @route   DELETE api/arkat/delete/{id}
// @desc    delete one arkat
// @access  Private
/**
 * @swagger
 * /api/arkat/delete/{id}:
 *  put:
 *    summary: Delete arka
 *    tags: [Arka]
 *    description: Delete arka
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: arka id
 *        required: true
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/Arka'
 *      500:
 *        description: internal server error
 */

 router.put("/delete/:id", arkaController.deleteArka);

module.exports = router;
