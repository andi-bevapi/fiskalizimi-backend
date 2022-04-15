const sequelize = require('../db');

const getAllDashboardReports = async (clientId, option) => {
    let startDate = '';
    let endDate = '';

    if (option === 'yearly') {
        var firstDay = new Date(new Date().getFullYear(), 0, 1);
        var lastDay = new Date(new Date().getFullYear(), 11, 31);
        startDate = firstDay.getFullYear() + "-" + firstDay.getMonth() + "-" + firstDay.getDate() + " " + "00:00:00";
        endDate = lastDay.getFullYear() + "-" + lastDay.getMonth() + "-" + lastDay.getDate() + " " + "23:59:59";
    } else if (option === 'monthly') {
        var date = new Date();
        date.setMonth(date.getMonth() + 1);
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        startDate = firstDay.getFullYear() + "-" + "0" + firstDay.getMonth() + "-" + firstDay.getDate() + " " + "00:00:00";
        endDate = lastDay.getFullYear() + "-" + "0" + lastDay.getMonth() + "-" + lastDay.getDate() + " " + "23:59:59";
    } else if (option === 'daily') {
        var date = new Date();
        date.setMonth(date.getMonth() + 1);
        startDate = date.getFullYear() + "-" + "0" + date.getMonth() + "-" + date.getDate() + " " + "00:00:00";
        endDate = date.getFullYear() + "-" + "0" + date.getMonth() + "-" + date.getDate() + " " + "23:59:59";
    } 

    return await sequelize.query(
        'SELECT sum(totalAmount) as totalAmount, sum(totalVat) as totalVat, count(1) as totalInvoices from Invoices where clientId = :clientId AND createdAt >= :startDate AND createdAt <= :endDate GROUP by clientId',
        {
            replacements: { clientId, startDate, endDate },
            type: sequelize.QueryTypes.SELECT
        }
    );
}

const getAllChartReports = async (clientId, start, end) => {
    const startDate = `${start} 00:00:00`;
    const endDate = `${end} 23:59:59`;

    return await sequelize.query(
        'SELECT date(createdAt) as dateCreated, sum(totalAmount) as totalAmount, count(1) as totalInvoices from Invoices where clientId = :clientId AND createdAt >= :startDate AND createdAt <= :endDate GROUP by dateCreated',
        {
            replacements: { clientId, startDate, endDate },
            type: sequelize.QueryTypes.SELECT
        }
    );
}

const getAllAnalyticsReports = async (clientId, start, end) => {
    const startDate = `${start} 00:00:00`;
    const endDate = `${end} 23:59:59`;

    return await sequelize.query(
        'SELECT * from Invoices where clientId = :clientId AND createdAt >= :startDate AND createdAt <= :endDate',
        {
            replacements: { clientId, startDate, endDate },
            type: sequelize.QueryTypes.SELECT
        }
    );
}

const getSingleInvoiceAnalytics = async (clientId, invoiceId) => {
    return await sequelize.query(
        'SELECT i.invoiceCode, i.totalAmount, i.totalAmountNoVAT, i.totalVat, i.totalVat6, i.totalVat20, i.paymentMethod, ii.quantity, ii.finalPrice, ii.originalPrice, p.name from Invoices i join InvoiceItems ii on ii.invoiceId = i.id join Products p on p.id = ii.productId where i.id = :invoiceId',
        {
            replacements: { clientId, invoiceId },
            type: sequelize.QueryTypes.SELECT
        }
    );
}

const getReportForSoldProductsByCategory = async (clientId) => {
    return await sequelize.query(
        'SELECT count(p.id) as totalProducts , c.name from Invoices i join InvoiceItems ii on ii.invoiceId = i.id join Products p on p.id = ii.productId join Categories c on c.id = p.categoryId where clientId = :clientId GROUP by c.id',
        {
            replacements: { clientId },
            type: sequelize.QueryTypes.SELECT
        }
    );
}

const getReportForSoldProductsBySupplier = async (clientId) => {
    return await sequelize.query(
        'SELECT count(p.id) as totalProducts , s.name from Invoices i join InvoiceItems ii on ii.invoiceId = i.id join Products p on p.id = ii.productId join Suppliers s on s.id = p.supplierId where clientId = :clientId GROUP by s.id',
        {
            replacements: { clientId },
            type: sequelize.QueryTypes.SELECT
        }
    );
}

module.exports = { getAllDashboardReports, getAllChartReports, getAllAnalyticsReports, getSingleInvoiceAnalytics, getReportForSoldProductsByCategory, getReportForSoldProductsBySupplier };