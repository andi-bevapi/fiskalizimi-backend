const ReportsService = require("../services/ReportsService");

const getDashboardReports = async (req, res, next) => {
    try {
        const data = await ReportsService.getAllDashboardReports(req.params.clientId, req.query.option);
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

const getSoldProductsReportByCategory = async (req, res, next) => {
    try {
        const data = await ReportsService.getReportForSoldProductsByCategory(req.params.clientId);
        res.ok(data);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const getSoldProductsReportBySupplier = async (req, res, next) => {
    try {
        const data = await ReportsService.getReportForSoldProductsBySupplier(req.params.clientId);
        res.ok(data);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = { getDashboardReports, getChartReports, getAnalyticsReports, getAnalyticsReportsForSingleInvoice, getSoldProductsReportByCategory, getSoldProductsReportBySupplier };
