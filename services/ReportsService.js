const sequelize = require('../db');

const getAllDashboardReports = async (clientId, start, end) => {
    const startDate = `${start} 00:00:00`;
    const endDate = `${end} 00:00:00`;

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
    const endDate = `${end} 00:00:00`;

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
    const endDate = `${end} 00:00:00`;

    return await sequelize.query(
        'SELECT * from Invoices where clientId = :clientId AND createdAt >= :startDate AND createdAt <= :endDate',
        {
            replacements: { clientId, startDate, endDate },
            type: sequelize.QueryTypes.SELECT
        }
    );
}

module.exports = { getAllDashboardReports, getAllChartReports, getAllAnalyticsReports };