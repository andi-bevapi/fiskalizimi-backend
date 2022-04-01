const ReportsService = require("../services/ReportsService");

const getDashboardReports = async (req, res, next) => {
    try {
        const data = await ReportsService.getAllDashboardReports(req.params.clientId);
        res.ok(data);
    } catch (error) {
        next(error);
    }
}

const getChartReports = async (req, res, next) => {
    try {
        const data = await ReportsService.getAllChartReports(req.params.clientId);
        res.ok(data);
    } catch (error) {
        next(error);
    }
}

const getAnalyticsReports = async (req, res, next) => {
    try {
        const data = await ReportsService.getAllAnalyticsReports(req.params.clientId, req.query.startDate, req.query.endDate);
        res.ok(data);
    } catch (error) {
        next(error);
    }
}

module.exports = { getDashboardReports, getChartReports, getAnalyticsReports };
