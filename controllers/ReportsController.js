const ReportsService = require("../services/ReportsService");

const getDashboardReports = async (req, res, next) => {
    try {
        const data = await ReportsService.getAllDashboardReports(req.params.clientId, req.query.startDate, req.query.endDate);
        res.ok(data);
    } catch (error) {
        next(error);
    }
}

const getChartReports = async (req, res, next) => {
    try {
        const data = await ReportsService.getAllChartReports(req.params.clientId, req.query.startDate, req.query.endDate);
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
        console.log(error)
        next(error);
    }
}

const getAnalyticsReportsForSingleInvoice = async (req, res, next) => {
    try {
        const data = await ReportsService.getSingleInvoiceAnalytics(req.params.clientId, req.params.id);
        res.ok(data);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const getSoldProductsReport = async (req, res, next) => {
    try {
        const data = await ReportsService.getReportForSoldProducts(req.params.clientId, req.query);
        res.ok(data);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const getOperatorsReport = async (req, res, next) => {
    try {
        const data = await ReportsService.getReportForOperators(req.params.clientId, req.query);
        res.ok(data);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const getDailyTurnoverReport = async (req, res, next) => {
    try {
        const data = await ReportsService.getReportForDailyTurnover(req.query);
        res.ok(data);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = { getDashboardReports, getChartReports, getAnalyticsReports, getAnalyticsReportsForSingleInvoice, getSoldProductsReport, getOperatorsReport, getDailyTurnoverReport };
