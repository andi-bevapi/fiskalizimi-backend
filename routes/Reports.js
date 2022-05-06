const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/ReportsController");

/**
 * @swagger
 * tags:
 *  name: Reports
 */

// @route   GET api/reports/:clientId
// @desc    Get reports
// @access  Private
/**
 * @swagger
 * /api/reports/{clientId}:
 *  get:
 *    summary: Get reports
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        name: clientId
 *        schema:
 *          type: number
 *        description: Client ID
 *        required: true
 *    responses:
 *      200:
 *       description: Success
 */
router.get("/:clientId", reportsController.getDashboardReports);

// @route   GET api/reports/charts/:clientId
// @desc    Get chart reports
// @access  Private
/**
 * @swagger
 * /api/reports/charts/{clientId}:
 *  get:
 *    summary: Get chart reports
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        name: clientId
 *        schema:
 *          type: number
 *        description: Client ID
 *        required: true
 *    responses:
 *      200:
 *       description: Success
 */
 router.get("/charts/:clientId", reportsController.getChartReports);

// @route   GET api/reports/analytics/:clientId
// @desc    Get analytics reports
// @access  Private
/**
 * @swagger
 * /api/reports/analytics/{clientId}:
 *  get:
 *    summary: Get analytics reports
 *    tags: [Reports]
 *    parameters:
 *      - in: path
 *        name: clientId
 *        schema:
 *          type: number
 *        description: Client ID
 *        required: true
 *    responses:
 *      200:
 *       description: Success
 */
 router.get("/analytics/:clientId", reportsController.getAnalyticsReports);

router.get("/analytics/:clientId/:id", reportsController.getAnalyticsReportsForSingleInvoice);

router.get("/sold-products/:clientId", reportsController.getSoldProductsReport);

router.get("/operators/:clientId", reportsController.getOperatorsReport);

router.get("/daily/turnover", reportsController.getDailyTurnoverReport);

router.get("/daily-summary/:userId", reportsController.getDailySummaryReport);

module.exports = router;
