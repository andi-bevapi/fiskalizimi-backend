const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');
const Joivalidation = require("../validation/clients");


/**
 * @swagger
 * tags:
 *  name: Client
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Client:
 *     type: object
 *     properties:
 *       name:
 *          type: string
 *       address:
 *          type: string
 *       NUIS:
 *          type: string
 *       logoVirtualPath:
 *          type: string
 *       email:
 *          type: string
 *       numberOfUsers:
 *          type: number
 *       phoneNumber:
 *          type: string
 *       softCode:
 *          type: string
 *       signature:
 *          type: string
 *       certificate:
 *          type: string
 *       validFrom:
 *          type: string
 *       validTo:
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

// @route   GET api/client
// @desc    Get all clients
// @access  Private
/**
 * @swagger
 * /api/client:
 *  get:
 *    summary: Get all clients
 *    tags: [Client]
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Client'
 */
router.get('/', clientController.getClients);


// @route   POST api/client/create
// @desc    Create new category
// @access  Private
/**
 *@swagger
 * /api/client/create:
 *   post:
 *       summary: Create new client
 *       tags: [Client]
 *       description: Create a new client
 *       requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Client'
 *       responses:
 *           "200":
 *             description: Success
 *           "500":
 *              description: internal server error
 */

router.post("/create",Joivalidation,clientController.createClients);

// @route   UPDATE api/client/update/{id}
// @desc    update one client
// @access  Private
/**
 * @swagger
 * /api/client/update/{id}:
 *  put:
 *    summary:  update one client
 *    tags: [Client]
 *    description: update a new client
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: client id
 *        required: true
 *    requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Client'
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 *      500:
 *        description: internal server error
 */

router.put("/update/:id",Joivalidation,clientController.updateClients);



// @route   Delete api/client/delete/{id}
// @desc    delete one client
// @access  Private
/**
 * @swagger
 * /api/client/delete/{id}:
 *  put:
 *    summary:  delete one client
 *    tags: [Client]
 *    description: delete a new client
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: client id
 *        required: true
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 *      500:
 *        description: internal server error
 */

 router.put("/delete/:id",clientController.deleteClients);

// @route   Get api/client/{id}
// @desc    get one client
// @access  Private
/**
 * @swagger
 * /api/client/{id}:
 *  get:
 *    summary:  get one client
 *    tags: [Client]
 *    description: get one client
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        description: client one id
 *        required: true
 *    responses:
 *      200:
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 *      500:
 *        description: internal server error
 */

 router.get("/get/:id",clientController.getClient);

module.exports = router;