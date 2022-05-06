const sequelize = require('../db');
const Invoice = require('../db/models/invoice');
const InvoiceItem = require("../db/models/invoiceitem");
const Product = require('../db/models/product');
const { Op } = require('sequelize');
const Client = require('../db/models/client');
const Branch = require('../db/models/branch');
const User = require('../db/models/user');

const getAllDashboardReports = async (clientId, start, end) => {
    const startDate = `${start} 00:00:00`;
    const endDate = `${end} 23:59:59`;

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

    const response = await Invoice.findAll({
        where: {
            clientId,
            createdAt: {
                [Op.and]: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                }
            }
        },
        include: [
            {
                model: InvoiceItem,
                as: "items",
                include: [
                    {
                        model: Product,
                        as: 'product'
                    }
                ]
            },
            {
                model: Client,
                as: 'client'
            },
            {
                model: Branch,
                as: 'branch'
            },
            {
                model: User,
                as: 'user'
            }
        ]
    });

    let data = response.map(x => x.get({ plain: true }))

    data = data.map(el => {
        const list = [];
        el.items.forEach(item => {
            list.push({
                productId: item.product.id,
                productName: item.product.name,
                quantity: item.quantity,
                finalPrice: item.finalPrice,
                originalPrice: item.originalPrice,
            })
        });
        el['productList'] = list;
        return {
            ...el,
            clientName: el.client.name,
            clientNUIS: el.client.NUIS,
            clientAddress: el.client.address,
            branchCode: el.branch.code,
            operatorCode: el.user.operatorCode,
            totalVat20: el.totalVat20.toFixed(2),
            totalAmount: el.totalAmount.toFixed(2),
            paymentMethod: el.paymentMethod === "1" ? "Cash" : "Bank",
            dateTime: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(el.dateTime))
        };
    });

    return data;
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

const getReportForSoldProducts = async (clientId, query) => {
    const { startDate, endDate } = query;

    const start = `${startDate} 00:00:00`;
    const end = `${endDate} 23:59:59`;

    let queryString = `SELECT p.*, c.name as "categoryName", s.name as "supplierName", su.name as "sellingUnitName", u.username, i.* from Invoices i 
    join InvoiceItems ii on ii.invoiceId = i.id
    join Products p on p.id = ii.productId
    join Categories c on c.id = p.categoryId
    join Suppliers s on s.id = p.supplierId
    join SellingUnits su on su.id = p.sellingUnitId
	join Users u on u.id = i.userId
    where i.createdAt >= :start AND i.createdAt <= :end
    AND i.clientId = :clientId
    GROUP BY p.id;`;

    const index = queryString.indexOf(':clientId') + ":clientId".length;

    if ("categoryId" in query) {
        queryString = queryString.slice(0, index) + " AND p.categoryId = :categoryId" + queryString.slice(index)
    }

    if ("supplierId" in query) {
        queryString = queryString.slice(0, index) + " AND p.supplierId = :supplierId" + queryString.slice(index)
    }

    if ("sellingUnitId" in query) {
        queryString = queryString.slice(0, index) + " AND p.sellingUnitId = :sellingUnitId" + queryString.slice(index)
    }

    if ("operatorId" in query) {
        queryString = queryString.slice(0, index) + " AND i.userId = :operatorId" + queryString.slice(index)
    }

    return await sequelize.query(queryString,
        {
            replacements: { start, end, clientId, categoryId: query.categoryId, supplierId: query.supplierId, sellingUnitId: query.sellingUnitId, operatorId: query.operatorId },
            type: sequelize.QueryTypes.SELECT
        }
    );
}

const getReportForOperators = async (clientId, query) => {
    const { startDate, endDate } = query;

    const start = `${startDate} 00:00:00`;
    const end = `${endDate} 23:59:59`;

    let queryString = `SELECT u.username, sum(totalAmountNoVAT) as totalAmountNoVAT, sum(totalAmount) as totalAmount, sum(totalVat) as totalVat, sum(totalVat6) as totalVat6, sum(totalVat20) as totalVat20 from Invoices i
    join Users u on u.id = i.userId
    where i.createdAt >= :start AND i.createdAt <= :end AND i.clientId = :clientId GROUP by i.userId`;

    const index = queryString.indexOf(':clientId') + ":clientId".length;

    if ("userId" in query) {
        queryString = queryString.slice(0, index) + " AND i.userId = :userId" + queryString.slice(index)
    }

    return await sequelize.query(queryString,
        {
            replacements: { start, end, clientId, userId: query.userId },
            type: sequelize.QueryTypes.SELECT
        }
    );
}

const getReportForDailyTurnover = async (query) => {
    const { startDate, endDate } = query;

    const start = `${startDate} 00:00:00`;
    const end = `${endDate} 23:59:59`;

    return await sequelize.query(`SELECT sh.*, u.username, sum(totalAmount) as totalAmount, sum(totalAmountNoVAT) as totalAmountNoVAT from ShiftHistories sh 
    join Invoices i on i.userId = sh.userId
    join Users u on u.id = sh.userId
    where sh.shiftStart >= :start AND (sh.shiftEnd <= :end OR sh.shiftEnd is null)
    AND i.createdAt >= :start AND i.createdAt <= :end
    GROUP BY sh.id`,
        {
            replacements: { start, end },
            type: sequelize.QueryTypes.SELECT
        }
    );
}

module.exports = { getAllDashboardReports, getAllChartReports, getAllAnalyticsReports, getSingleInvoiceAnalytics, getReportForSoldProducts, getReportForOperators, getReportForDailyTurnover };